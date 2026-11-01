from django.contrib import admin

from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("owner_email", "template_name", "created_at", "updated_at")
    search_fields = ("owner_email", "template_name")
