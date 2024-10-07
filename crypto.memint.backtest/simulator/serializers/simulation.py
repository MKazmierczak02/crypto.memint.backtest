from rest_framework import serializers
from simulator.models import Simulation, Strategy, Symbol, TimeFrame

from .strategy import StrategySerializer


class SimulationSerializer(serializers.ModelSerializer):
    strategy = StrategySerializer(read_only=True)
    strategy_id = serializers.PrimaryKeyRelatedField(
        queryset=Strategy.objects.all(), source="strategy", write_only=True
    )
    symbol_code = serializers.SerializerMethodField()
    symbol = serializers.SlugRelatedField(
        queryset=Symbol.objects.all(), slug_field="base_currency", write_only=True
    )
    timeframe = serializers.SlugRelatedField(
        queryset=TimeFrame.objects.all(),
        slug_field="timeframe_id",
    )

    class Meta:
        model = Simulation
        fields = [
            "id",
            "strategy",
            "strategy_id",
            "symbol",
            "symbol_code",
            "timeframe",
            "data_from",
            "data_to",
            "leverage",
            "initial_balance",
            "fixed_trade_value",
            "final_balance",
            "roi",
            "max_drawdown",
            "max_positions",
            "status",
            "created_at",
            "start_date",
            "end_date",
            "task_id",
        ]
        read_only_fields = [
            "id",
            "final_balance",
            "roi",
            "max_drawdown",
            "max_positions",
            "status",
            "created_at",
            "start_date",
            "end_date",
            "task_id",
        ]

    def validate(self, data):
        if data["data_from"] != None and data["data_to"] != None:
            if data["data_from"] > data["data_to"]:
                raise serializers.ValidationError(
                    "The 'data_from' date must be before 'data_to' date."
                )
        return data

    def get_symbol_code(self, obj):
        return str(obj.symbol)

    def create(self, validated_data):
        return Simulation.objects.create(**validated_data)
