import base64
from datetime import timedelta
from unittest.mock import patch

from django.test import TestCase
from django.core.cache import cache
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from .models import ResumeAnalysisCache


class AnalyzeResumeCachingTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.url = reverse("analyze_resume")
        self.analysis_result = {
            "score": 74,
            "feedback": ["Clear experience section.", "Add more role-specific detail."],
        }

    @patch("resumes.views.generate_resume_analysis")
    def test_repeated_text_analysis_reuses_same_score_and_feedback(self, generate):
        generate.return_value = self.analysis_result
        payload = {"resumeContent": "Sample software engineer resume text."}

        first = self.client.post(self.url, payload, format="json")
        second = self.client.post(self.url, payload, format="json")

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.json(), second.json())
        self.assertEqual(first.json()["result"]["score"], 74)
        generate.assert_called_once()
        self.assertEqual(ResumeAnalysisCache.objects.count(), 1)

    @patch("resumes.views.generate_resume_analysis")
    def test_repeated_uploaded_file_analysis_reuses_same_result(self, generate):
        generate.return_value = self.analysis_result
        file_bytes = b"same synthetic resume image"
        payload = {
            "resumeContent": {
                "mimeType": "image/jpeg",
                "data": base64.b64encode(file_bytes).decode("ascii"),
            }
        }

        first = self.client.post(self.url, payload, format="json")
        second = self.client.post(self.url, payload, format="json")

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(first.json(), second.json())
        generate.assert_called_once()

    @patch("resumes.views.generate_resume_analysis")
    def test_changed_resume_content_gets_a_new_analysis(self, generate):
        generate.side_effect = [self.analysis_result, {"score": 81, "feedback": ["More detail." ]}]

        first = self.client.post(self.url, {"resumeContent": "Resume version A"}, format="json")
        second = self.client.post(self.url, {"resumeContent": "Resume version B"}, format="json")

        self.assertEqual(first.json()["result"]["score"], 74)
        self.assertEqual(second.json()["result"]["score"], 81)
        self.assertEqual(generate.call_count, 2)
        self.assertEqual(ResumeAnalysisCache.objects.count(), 2)

    @patch("resumes.views.generate_resume_analysis")
    def test_expired_result_is_reanalyzed(self, generate):
        generate.side_effect = [self.analysis_result, {"score": 79, "feedback": ["Updated review."]}]
        payload = {"resumeContent": "A resume that will be rechecked after cache expiry."}

        first = self.client.post(self.url, payload, format="json")
        cache_row = ResumeAnalysisCache.objects.get()
        ResumeAnalysisCache.objects.filter(pk=cache_row.pk).update(
            expires_at=timezone.now() - timedelta(seconds=1)
        )
        cache.clear()
        second = self.client.post(self.url, payload, format="json")

        self.assertEqual(first.status_code, 200)
        self.assertEqual(second.status_code, 200)
        self.assertEqual(second.json()["result"]["score"], 79)
        self.assertEqual(generate.call_count, 2)
