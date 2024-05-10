from rest_framework import viewsets
from ..models import Simulation
from ..serializers import SimulationSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


class SimulationViewSet(viewsets.ModelViewSet):
    serializer_class = SimulationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # return Simulation.objects.filter(user=self.request.user)
        return Simulation.objects.all()

    def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
        serializer.save(user=User.objects.first())
