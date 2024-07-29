from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Strategy, Symbol, Simulation, PriceData

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class StrategySerializer(serializers.ModelSerializer):
    class Meta:
        model = Strategy
        fields = [
            "id",
            "name",
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


class ControlIdSerializer(serializers.Serializer):
    id = serializers.IntegerField(help_text="Primary key of the endpoint object handling")



class PriceDataSerializer(serializers.ModelSerializer):
    symbol = serializers.PrimaryKeyRelatedField(queryset=Symbol.objects.all())

    class Meta:
        model = PriceData
        fields = "__all__"
