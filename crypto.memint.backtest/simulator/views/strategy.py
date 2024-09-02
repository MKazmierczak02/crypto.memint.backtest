from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from ..models import Strategy
from ..serializers import StrategySerializer


class StrategyViewSet(viewsets.ModelViewSet):
    serializer_class = StrategySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Strategy.objects.filter(user=self.request.user)
        # return Strategy.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())
