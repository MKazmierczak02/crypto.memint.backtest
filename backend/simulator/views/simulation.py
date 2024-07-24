from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from ..models import Simulation
from ..handlers.simulation import SimulationThread
from ..serializers import SimulationSerializer, ControlIdSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from drf_spectacular.utils import extend_schema

simulation_threads = {}
User = get_user_model()


class SimulationViewSet(viewsets.ModelViewSet):
    serializer_class = SimulationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # return Simulation.objects.filter(user=self.request.user)
        return Simulation.objects.all()

    def perform_create(self, serializer):
        # serializer.save(user=self.request.user)
        serializer.save(user=User.objects.first())


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@extend_schema(
    request=ControlIdSerializer,
    methods=['POST']
)
def start_simulation(request):
    id = request.data.get('id')
    if not id:
        return Response({"status": "error", "message": "id: Simulation ID is required."}, status=400)

    simulation = get_object_or_404(Simulation, id=id, user=request.user)

    simulation_thread = SimulationThread(
        simulation.id, simulation.strategy.strategy_definition
    )
    simulation_threads[simulation.id] = simulation_thread
    simulation_thread.start()
    return Response({"status": "ok", "simulation": simulation.data}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def stop_simulation(request):
    id = request.data.get('id')
    if not id:
        return Response({"status": "error", "message": "id: Simulation ID is required."}, status=400)
    simulation = get_object_or_404(Simulation, id=id, user=request.user)

    simulation_thread = simulation_threads.pop(simulation.id)
    simulation_thread.stop()
    return Response({"status": "ok", "simulation": simulation.data}, status=200)
