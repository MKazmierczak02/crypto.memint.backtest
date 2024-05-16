from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Strategy, Symbol, Simulation, PriceData


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class StrategySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Strategy
        fields = [
            "id",
            "name",
            "user",
            "created_at",
            "updated_at",
            "description",
            "strategy_definition",
        ]
        read_only_fields = ["created_at", "updated_at"]


class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbol
        fields = ["id", "crypto", "vs_currency"]


class SimulationSerializer(serializers.ModelSerializer):
    strategy = serializers.PrimaryKeyRelatedField(queryset=Strategy.objects.all())
    symbols = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Symbol.objects.all()
    )

    class Meta:
        model = Simulation
        fields = [
            "id",
            "strategy",
            "symbols",
            "start_date",
            "end_date",
            "initial_capital",
            "final_capital",
            "profit_loss",
            "performance_metrics",
        ]
        read_only_fields = [
            "end_date",
            "final_capital",
            "profit_loss",
            "performance_metrics",
        ]


class PriceDataSerializer(serializers.ModelSerializer):
    symbol = serializers.PrimaryKeyRelatedField(queryset=Symbol.objects.all())

    class Meta:
        model = PriceData
        fields = "__all__"
