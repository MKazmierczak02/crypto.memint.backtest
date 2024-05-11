from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from ..models import Simulation
from ..handlers.simulation import SimulationThread
from ..serializers import SimulationSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

simulation_threads = {}


class SimulationViewSet(viewsets.ModelViewSet):
    serializer_class = SimulationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # return Simulation.objects.filter(user=self.request.user)
        return Simulation.objects.all()

    def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
        serializer.save(user=User.objects.first())


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def start_simulation(request, pk):
    simulation = get_object_or_404(Simulation, pk=pk)
    if simulation.user_id == request.user.id:
        simulation_thread = SimulationThread(simulation.id, simulation.symbols)
        simulation_threads[simulation.id] = simulation_thread
        simulation_thread.start()
        return Response({"status": "ok"})
    return Response({"status": "error"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def stop_simulation(request, pk):
    simulation = get_object_or_404(Simulation, pk=pk)
    if simulation.user_id == request.user.id:
        simulation_thread = simulation_threads.pop(simulation.id)
        simulation_thread.stop()
        return Response({"status": "ok"})
    return Response({"status": "error"})
