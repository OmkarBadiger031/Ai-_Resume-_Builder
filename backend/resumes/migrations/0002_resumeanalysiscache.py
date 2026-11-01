from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("resumes", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ResumeAnalysisCache",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content_hash", models.CharField(max_length=64, unique=True)),
                ("result", models.JSONField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("expires_at", models.DateTimeField(db_index=True)),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
