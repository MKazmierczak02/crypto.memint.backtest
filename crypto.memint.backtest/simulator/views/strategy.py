from rest_framework import viewsets
from ..models import Strategy
from ..serializers import StrategySerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class StrategyViewSet(viewsets.ModelViewSet):
    serializer_class = StrategySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # return Strategy.objects.filter(user=self.request.user)
        return Strategy.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())
