from rest_framework import viewsets
from ..models import Strategy
from ..serializers import StrategySerializer
from rest_framework.permissions import IsAuthenticated


class StrategyViewSet(viewsets.ModelViewSet):
    serializer_class = StrategySerializer

    def get_queryset(self):
        return Strategy.objects.filter(user=self.request.user)
        # return Strategy.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

