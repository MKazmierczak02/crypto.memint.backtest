from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    Action,
    Condition,
    PriceData,
    Simulation,
    Strategy,
    Symbol,
    Transaction,
)

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"


class StrategySerializer(serializers.ModelSerializer):
    conditions = ConditionSerializer(many=True, read_only=True)
    actions = ActionSerializer(many=True, read_only=True)
    parameters = serializers.JSONField()

    class Meta:
        model = Strategy
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbol
        fields = "__all__"


class SimulationSerializer(serializers.ModelSerializer):
    strategy = StrategySerializer()
    transactions = TransactionSerializer(
        many=True, read_only=True
    )  # Ensure transactions are included properly

    class Meta:
        model = Simulation
        fields = "__all__"


class ControlIdSerializer(serializers.Serializer):
    id = serializers.IntegerField(
        help_text="Primary key of the endpoint object handling"
    )


class PriceDataSerializer(serializers.ModelSerializer):
    pair = serializers.PrimaryKeyRelatedField(queryset=Symbol.objects.all())

    class Meta:
        model = PriceData
        fields = "__all__"
