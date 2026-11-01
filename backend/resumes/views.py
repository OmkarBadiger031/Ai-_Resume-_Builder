import os
import json
import base64
import hashlib
import hmac
import logging
from datetime import timedelta

from django.conf import settings
from django.core.cache import cache
from django.db import DatabaseError, IntegrityError, connection
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from google import genai
from google.genai import types

from .models import ResumeAnalysisCache

logger = logging.getLogger(__name__)

GEMINI_MODEL = "gemini-3-flash-preview"
ATS_ANALYSIS_CACHE_DAYS = 30
ATS_ANALYSIS_PROMPT_VERSION = "ats-analysis-v1"


def get_gemini_client():
    """Create a Gemini client using the backend environment variable."""
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("GEMINI_API_KEY is not configured on the backend.")

    return genai.Client(api_key=api_key)


def generate_json_with_gemini(prompt, response_schema=None):
    """Generate JSON using Gemini on the backend."""
    client = get_gemini_client()

    config_options = {
        "response_mime_type": "application/json",
        "temperature": 0.3,
    }

    if response_schema:
        config_options["response_schema"] = response_schema

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(**config_options),
    )

    if not response.text:
        raise ValueError("Gemini returned an empty response.")

    return json.loads(response.text)


def gemini_error_response(error):
    """Return safe error messages without exposing credentials."""
    logger.exception("Gemini API request failed: %s", type(error).__name__)

    if isinstance(error, ValueError):
        return Response(
            {"error": str(error)},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        {"error": "The AI service could not complete your request. Please try again."},
        status=status.HTTP_502_BAD_GATEWAY,
    )


def get_analysis_cache_key(mime_type, content_bytes):
    """Digest the exact analysis input without storing or exposing its contents."""
    message = (
        ATS_ANALYSIS_PROMPT_VERSION.encode()
        + b"\0"
        + GEMINI_MODEL.encode()
        + b"\0"
        + mime_type.encode()
        + b"\0"
        + content_bytes
    )
    return hmac.new(settings.SECRET_KEY.encode(), message, hashlib.sha256).hexdigest()


def generate_resume_analysis(resume_part):
    client = get_gemini_client()
    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=[
            """
            Analyze this resume and provide a score from 1 to 100,
            along with practical feedback on its strengths and improvements.
            Apply the same evaluation criteria consistently. Do not invent
            information that is not in the resume.

            Return JSON with:
            - score: integer from 1 to 100
            - feedback: array of concise strings
            """,
            resume_part,
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema={
                "type": "OBJECT",
                "properties": {
                    "score": {"type": "INTEGER"},
                    "feedback": {
                        "type": "ARRAY",
                        "items": {"type": "STRING"},
                    },
                },
                "required": ["score", "feedback"],
            },
            temperature=0,
        ),
    )

    if not response.text:
        raise ValueError("Gemini returned an empty analysis.")

    result = json.loads(response.text)
    score = result.get("score")
    feedback = result.get("feedback")
    if (
        not isinstance(score, int)
        or not 1 <= score <= 100
        or not isinstance(feedback, list)
        or not all(isinstance(item, str) for item in feedback)
    ):
        raise ValueError("Gemini returned an invalid resume analysis.")

    return {"score": score, "feedback": feedback}


@api_view(["GET"])
def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
    except DatabaseError:
        return Response(
            {
                "status": "error",
                "message": "Database connection is unavailable.",
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    return Response({
        "status": "ok",
        "message": "Resume backend is running.",
        "database": "available",
    })


@api_view(["POST"])
def generate_work_experience_bullets(request):
    job_title = request.data.get("jobTitle", "")
    company = request.data.get("company", "")
    description = request.data.get("existingDescription", "")

    if not all(isinstance(value, str) for value in (job_title, company, description)):
        return Response(
            {"error": "Job title, company, and description must be text."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not job_title.strip():
        return Response(
            {"error": "Job title is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    prompt = f"""
    Suggest 3 to 5 concise, professional resume bullet points.

    Job title: {job_title}
    Company: {company}
    Existing description: {description}

    Do not invent achievements, numbers, technologies, or responsibilities.
    If details are limited, use general wording that does not claim unverified facts.

    Return JSON in this format:
    {{"bulletPoints": ["point 1", "point 2", "point 3"]}}
    """

    try:
        result = generate_json_with_gemini(
            prompt,
            response_schema={
                "type": "OBJECT",
                "properties": {
                    "bulletPoints": {
                        "type": "ARRAY",
                        "items": {"type": "STRING"},
                    }
                },
                "required": ["bulletPoints"],
            },
        )

        bullets = result.get("bulletPoints", [])

        if not isinstance(bullets, list):
            raise ValueError("Gemini returned an invalid bullet-point format.")

        return Response({"result": bullets})

    except Exception as error:
        return gemini_error_response(error)


@api_view(["POST"])
def generate_resume(request):
    prompt_text = request.data.get("prompt", "")

    if not isinstance(prompt_text, str) or not prompt_text.strip():
        return Response(
            {"error": "Please provide a resume description or prompt."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if len(prompt_text) > 12000:
        return Response(
            {"error": "The resume prompt is too long. Please shorten it."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    prompt = f"""
    You are a professional resume-writing assistant.

    Create a resume JSON object using the supplied information.
    Follow the exact structure described below.

    Rules:
    - Never invent personal details, contact information, degrees, jobs,
      skills, projects, awards, or achievements.
    - Preserve dates and years of experience supplied by the user.
    - Use empty strings for unknown text fields.
    - Use empty arrays for unknown list sections.
    - Every list entry must have a unique string ID.
    - The personalInfo.photo field must be an empty string.
    - Use professional, concise language.
    - Output valid JSON only.

    Required structure:
    {{
      "personalInfo": {{
        "fullName": "",
        "email": "",
        "phoneNumber": "",
        "address": "",
        "linkedIn": "",
        "photo": "",
        "github": ""
      }},
      "summary": "",
      "workExperience": [
        {{
          "id": "",
          "jobTitle": "",
          "company": "",
          "location": "",
          "startDate": "",
          "endDate": "",
          "isCurrent": false,
          "description": ""
        }}
      ],
      "education": [
        {{
          "id": "",
          "institution": "",
          "degree": "",
          "fieldOfStudy": "",
          "startDate": "",
          "endDate": ""
        }}
      ],
      "skills": [{{"id": "", "name": ""}}],
      "projects": [
        {{"id": "", "name": "", "description": "", "url": ""}}
      ],
      "awards": [
        {{"id": "", "name": "", "issuer": "", "date": ""}}
      ],
      "additionalSections": []
    }}

    User information:
    {prompt_text}
    """

    try:
        result = generate_json_with_gemini(prompt)

        required_keys = [
            "personalInfo",
            "summary",
            "workExperience",
            "education",
            "skills",
            "projects",
            "awards",
        ]

        if not isinstance(result, dict) or any(
            key not in result for key in required_keys
        ):
            raise ValueError("Gemini returned an incomplete resume.")

        result["personalInfo"]["photo"] = ""

        return Response({"result": result})

    except Exception as error:
        return gemini_error_response(error)


@api_view(["POST"])
def general_ai_assistance(request):
    query = request.data.get("query", "")
    resume_data = request.data.get("resumeData", {})

    if not isinstance(query, str) or not query.strip():
        return Response(
            {"error": "Please enter a question."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if len(query) > 5000:
        return Response(
            {"error": "Your question is too long."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not isinstance(resume_data, dict):
        return Response(
            {"error": "Resume data must be a JSON object."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    resume_json = json.dumps(resume_data, ensure_ascii=False)

    prompt = f"""
    You are a helpful career coach and resume-writing assistant.
    Answer the user's question clearly and practically.
    Do not invent qualifications or experience.

    Resume information:
    {resume_json}

    User question:
    {query}
    """

    try:
        result = generate_json_with_gemini(
            f"""
            Return a JSON object with one string property named "answer".
            The answer should contain the career advice requested.

            {prompt}

            JSON format:
            {{"answer": "Your response here"}}
            """,
            response_schema={
                "type": "OBJECT",
                "properties": {"answer": {"type": "STRING"}},
                "required": ["answer"],
            },
        )

        answer = result.get("answer", "")

        if not isinstance(answer, str):
            raise ValueError("Gemini returned an invalid answer.")

        return Response({"result": answer})

    except Exception as error:
        return gemini_error_response(error)


@api_view(["POST"])
def analyze_resume(request):
    resume_content = request.data.get("resumeContent")

    if not resume_content:
        return Response(
            {"error": "Please provide resume content to analyze."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        if isinstance(resume_content, str):
            if len(resume_content) > 50000:
                return Response(
                    {"error": "The resume content is too long."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            mime_type = "text/plain"
            content_bytes = resume_content.encode("utf-8")
            resume_part = resume_content

        elif isinstance(resume_content, dict):
            mime_type = resume_content.get("mimeType")
            encoded_data = resume_content.get("data")

            if not isinstance(mime_type, str) or not isinstance(encoded_data, str):
                return Response(
                    {"error": "Invalid uploaded resume format."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if mime_type not in ("application/pdf", "image/png", "image/jpeg"):
                return Response(
                    {"error": "Only PDF, PNG, and JPEG files are supported."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if len(encoded_data) > 10_000_000:
                return Response(
                    {"error": "The uploaded file is too large."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                content_bytes = base64.b64decode(encoded_data, validate=True)
            except Exception:
                return Response(
                    {"error": "The uploaded file data is invalid."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            resume_part = types.Part.from_bytes(data=content_bytes, mime_type=mime_type)
        else:
            return Response(
                {"error": "Unsupported resume content format."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cache_key = get_analysis_cache_key(mime_type, content_bytes)
        now = timezone.now()
        cached_result = cache.get(cache_key)
        if cached_result:
            return Response({"result": cached_result})

        try:
            cached = ResumeAnalysisCache.objects.filter(
                content_hash=cache_key,
                expires_at__gt=now,
            ).first()
            if cached:
                cache.set(
                    cache_key,
                    cached.result,
                    timeout=ATS_ANALYSIS_CACHE_DAYS * 24 * 60 * 60,
                )
                return Response({"result": cached.result})
            ResumeAnalysisCache.objects.filter(
                content_hash=cache_key,
                expires_at__lte=now,
            ).delete()
        except DatabaseError as cache_error:
            logger.warning("ATS result cache lookup unavailable: %s", type(cache_error).__name__)

        result = generate_resume_analysis(resume_part)
        cache.set(
            cache_key,
            result,
            timeout=ATS_ANALYSIS_CACHE_DAYS * 24 * 60 * 60,
        )
        try:
            ResumeAnalysisCache.objects.update_or_create(
                content_hash=cache_key,
                defaults={
                    "result": result,
                    "expires_at": now + timedelta(days=ATS_ANALYSIS_CACHE_DAYS),
                },
            )
        except IntegrityError:
            # Another request may have completed the same analysis concurrently.
            cached = ResumeAnalysisCache.objects.filter(
                content_hash=cache_key,
                expires_at__gt=timezone.now(),
            ).first()
            if cached:
                result = cached.result
        except DatabaseError as cache_error:
            logger.warning("ATS result cache save unavailable: %s", type(cache_error).__name__)

        return Response({"result": result})
    except Exception as error:
        return gemini_error_response(error)