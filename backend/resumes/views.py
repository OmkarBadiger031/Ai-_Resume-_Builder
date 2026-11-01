from django.db import DatabaseError, connection
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


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
