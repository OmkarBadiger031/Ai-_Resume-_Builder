"""Isolated settings for local automated tests; never use for deployment."""

import os

os.environ["DEBUG"] = "True"
os.environ["DJANGO_SECRET_KEY"] = "test-only-key-not-for-real-use"
os.environ["DB_NAME"] = "test_database"
os.environ["DB_USER"] = "test_user"
os.environ["DB_PASSWORD"] = "test_password"
os.environ["DB_HOST"] = "127.0.0.1"

from .settings import *  # noqa: F403, E402

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}
