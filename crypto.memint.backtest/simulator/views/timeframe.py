from rest_framework import viewsets
from simulator.models.timeframe import TimeFrame
from simulator.serializers.timeframe import TimeFrameSerializer

from ..permissions import IsAdminUserOrReadOnly


class TimeFrameViewSet(viewsets.ModelViewSet):
    serializer_class = TimeFrameSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return TimeFrame.objects.all()
