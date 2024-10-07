import csv
from io import StringIO

from celery.result import AsyncResult
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.serializers import ValidationError

from simulator.serializers.simulation_summary import SimulationSummarySerializer
from simulator.models import Simulation
from simulator.serializers.common import ControlIdSerializer
from simulator.serializers.simulation import SimulationSerializer
from simulator.tasks import analyze_market_data

User = get_user_model()


class SimulationViewSet(viewsets.ModelViewSet):
    serializer_class = SimulationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Simulation.objects.filter(strategy__user=self.request.user)

    def perform_create(self, serializer):
        strategy = serializer.validated_data['strategy']
        if strategy.user != self.request.user:
            raise ValidationError("You do not own this strategy.")
        serializer.save()


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@extend_schema(request=ControlIdSerializer, methods=["POST"])
def start_simulation(request):
    id = request.data.get("id")
    if not id:
        return Response(
            {"status": "error", "message": "id: Simulation ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    simulation = get_object_or_404(Simulation, id=id, strategy__user=request.user)
    if simulation.status != "Ready":
        return Response({"status": "error", "message": f"Simulation status is {simulation.status}."},
                        status=status.HTTP_409_CONFLICT)
    task = analyze_market_data.delay(simulation.id)
    simulation.task_id = task.id
    simulation.save()

    return Response({"status": simulation.status, "task_id": task.id}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@extend_schema(request=ControlIdSerializer, methods=["POST"])
def reset_simulation(request):
    id = request.data.get("id")
    if not id:
        return Response(
            {"status": "error", "message": "id: Simulation ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    simulation = get_object_or_404(Simulation, id=id, strategy__user=request.user)
    simulation.status = "Ready"
    simulation.final_balance = None
    simulation.roi = None
    simulation.max_drawdown = None
    simulation.start_date = None
    simulation.end_date = None
    simulation.task_id = None
    simulation.positions.all().delete()
    simulation.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@extend_schema(request=ControlIdSerializer, methods=["POST"])
def check_analysis_result(request):
    id = request.data.get("id")
    if not id:
        return Response(
            {"status": "error", "message": "id: Simulation ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    simulation = get_object_or_404(Simulation, id=id, strategy__user=request.user)
    if simulation.task_id:
        task = AsyncResult(simulation.task_id)
        if task.state == "SUCCESS":
            result_id = task.result
            return Response(
                {"status": task.state, "result": result_id}, status=status.HTTP_200_OK
            )
    return Response({"status": simulation.status}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def simulation_summary(request, simulation_id):
    simulation = get_object_or_404(
        Simulation.objects.select_related('strategy', 'symbol', 'timeframe')
        .prefetch_related('positions__symbol'),
        id=simulation_id,
        strategy__user=request.user
    )
    serializer = SimulationSummarySerializer(simulation)
    return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def export_simulation_to_csv(request, simulation_id):
    import datetime
    simulation = get_object_or_404(Simulation, id=simulation_id, strategy__user=request.user)

    buffer = StringIO()
    writer = csv.writer(buffer)

    writer.writerow(["Simulation Details"])
    writer.writerow(["Field", "Value"])
    writer.writerow(["Simulation ID", simulation.id])
    writer.writerow(["Strategy", simulation.strategy.name])
    writer.writerow([
        "Symbol",
        f"{simulation.symbol.base_currency}/{simulation.symbol.quote_currency}",
    ])
    writer.writerow(["Timeframe", simulation.timeframe.description])
    writer.writerow(["Data From", simulation.data_from])
    writer.writerow(["Data To", simulation.data_to])
    writer.writerow(["Start Date", simulation.start_date])
    writer.writerow(["End Date", simulation.end_date])
    writer.writerow(["Initial Balance", simulation.initial_balance])
    writer.writerow(["Final Balance", simulation.final_balance])
    writer.writerow(["ROI", f"{simulation.roi}%"])
    writer.writerow(["Max Drawdown", f"{simulation.max_drawdown}%"])
    writer.writerow([])

    writer.writerow(["Strategy Conditions"])
    for condition_group in simulation.strategy.condition_groups.all().order_by("order"):
        writer.writerow([f"Condition Group {condition_group.order} - Action: {condition_group.action.action_type}"])
        for condition in condition_group.conditions.all().order_by("order"):
            left_indicator = condition.indicator_left.name
            left_params = condition.indicator_left.parameters  # Assuming this is a dict
            left_params_str = ', '.join(f"{k}={v}" for k, v in left_params.items()) if left_params else ''

            operator = condition.operator

            if condition.constant_value is not None:
                right_value = condition.constant_value
            elif condition.indicator_right:
                right_indicator = condition.indicator_right.name
                right_params = condition.indicator_right.parameters  # Assuming this is a dict
                right_params_str = ', '.join(f"{k}={v}" for k, v in right_params.items()) if right_params else ''
                right_value = f"{right_indicator} ({right_params_str})"
            else:
                right_value = ""

            logical_operator = condition.logical_operator

            writer.writerow([
                f"Condition {condition.order}",
                f"Left Indicator: {left_indicator} ({left_params_str})",
                f"Operator: {operator}",
                f"Right Value: {right_value}",
                f"Logical Operator: {logical_operator}",
            ])
        writer.writerow([])

    writer.writerow([])

    writer.writerow(["Positions"])
    positions = simulation.positions.all()
    writer.writerow([
        "Position ID",
        "Symbol",
        "Position Type",
        "Entry Price",
        "Entry Timestamp",
        "Exit Price",
        "Exit Timestamp",
        "Size",
        "Profit/Loss",
        "Leverage",
    ])
    open_positions = []
    closed_positions = []
    for position in positions:
        if position.is_closed:
            closed_positions.append(position)
            writer.writerow([
                position.id,
                f"{position.symbol.base_currency}/{position.symbol.quote_currency}",
                position.position_type,
                position.entry_price,
                position.entry_timestamp,
                position.close_price,
                position.close_timestamp,
                position.size,
                position.realized_profit,
                position.leverage,
            ])
        else:
            open_positions.append(position)

    if open_positions:
        writer.writerow([])
        writer.writerow(["Open Positions"])
        writer.writerow([
            "Position ID",
            "Symbol",
            "Position Type",
            "Entry Price",
            "Entry Timestamp",
            "Size",
            "Unrealized Profit/Loss",
            "Leverage",
        ])
        for position in open_positions:
            writer.writerow([
                position.id,
                f"{position.symbol.base_currency}/{position.symbol.quote_currency}",
                position.position_type,
                position.entry_price,
                position.entry_timestamp,
                position.size,
                position.unrealized_profit,
                position.leverage,
            ])

    writer.writerow([])

    writer.writerow(["Transaction History"])
    writer.writerow([
        "Transaction Type",
        "Position ID",
        "Symbol",
        "Position Type",
        "Size",
        "Price",
        "Timestamp",
        "Profit/Loss",
    ])

    for position in closed_positions:
        writer.writerow([
            "OPEN",
            position.id,
            f"{position.symbol.base_currency}/{position.symbol.quote_currency}",
            position.position_type,
            position.size,
            position.entry_price,
            position.entry_timestamp,
            "",
        ])
        writer.writerow([
            "CLOSE",
            position.id,
            f"{position.symbol.base_currency}/{position.symbol.quote_currency}",
            position.position_type,
            position.size,
            position.close_price,
            position.close_timestamp,
            position.realized_profit,
        ])

    for position in open_positions:
        writer.writerow([
            "OPEN",
            position.id,
            f"{position.symbol.base_currency}/{position.symbol.quote_currency}",
            position.position_type,
            position.size,
            position.entry_price,
            position.entry_timestamp,
            "",
        ])

    response = HttpResponse(buffer.getvalue(), content_type="text/csv")
    filename = f"simulation_report_{simulation.id}_{datetime.date.today()}.csv"
    response['Content-Disposition'] = f'attachment; filename={filename}'

    return response
