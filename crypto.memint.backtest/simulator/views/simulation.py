from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from ..models import Simulation
from ..tasks import analyze_market_data
from ..serializers import SimulationSerializer, ControlIdSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from drf_spectacular.utils import extend_schema
from celery.result import AsyncResult

simulation_threads = {}
User = get_user_model()


class SimulationViewSet(viewsets.ModelViewSet):
    serializer_class = SimulationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Simulation.objects.filter(strategy__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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

    simulation = get_object_or_404(Simulation, id=id, strategy__user=request.user)

    task = analyze_market_data.delay(simulation.id)

    return Response({"status": "ok", "task_id": task.id}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@extend_schema(
    request=ControlIdSerializer,
    methods=['POST']
)
def check_analysis_result(request):
    id = request.data.get('id')
    if not id:
        return Response({"status": "error", "message": "id: Simulation ID is required."}, status=400)
    print(f"id: {id}")

    task = AsyncResult(id)

    if task.state == 'SUCCESS':
        result_id = task.result
        return Response({"status": "completed", "result": task.state})
    else:
        return Response({"status": task.state})
