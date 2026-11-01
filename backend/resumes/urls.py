from django.urls import path

from .views import (
    health_check,
    generate_work_experience_bullets,
    generate_resume,
    general_ai_assistance,
    analyze_resume,
)

urlpatterns = [
    path("health/", health_check, name="health_check"),

    # Gemini AI endpoints
    path(
        "ai/work-experience-bullets/",
        generate_work_experience_bullets,
        name="generate_work_experience_bullets",
    ),
    path(
        "ai/generate-resume/",
        generate_resume,
        name="generate_resume",
    ),
    path(
        "ai/general-assistance/",
        general_ai_assistance,
        name="general_ai_assistance",
    ),
    path(
        "ai/analyze-resume/",
        analyze_resume,
        name="analyze_resume",
    ),
]