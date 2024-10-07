from rest_framework import viewsets

from simulator.models.timeframe import TimeFrame
from ..permissions import IsAdminUserOrReadOnly
from simulator.serializers.timeframe import TimeFrameSerializer


class TimeFrameViewSet(viewsets.ModelViewSet):
    serializer_class = TimeFrameSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return TimeFrame.objects.all()
