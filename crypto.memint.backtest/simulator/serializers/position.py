from rest_framework import serializers

from ..models import Position


class PositionSerializer(serializers.ModelSerializer):
    symbol_name = serializers.CharField(source="symbol.name", read_only=True)

    class Meta:
        model = Position
        fields = [
            "id",
            "simulation",
            "symbol",
            "symbol_name",
            "size",
            "entry_price",
            "position_type",
            "leverage",
            "fee",
            "entry_timestamp",
            "stop_loss_price",
            "stop_loss_percent",
            "take_profit_price",
            "take_profit_percent",
            "status",
            "close_price",
            "close_timestamp",
            "realized_profit",
            "unrealized_profit",
            "total_profit",
        ]
