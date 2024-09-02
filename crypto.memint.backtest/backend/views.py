from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):

    data = {"status": "ok", "message": "API is up and running"}
    return Response(data, status=status.HTTP_200_OK)
