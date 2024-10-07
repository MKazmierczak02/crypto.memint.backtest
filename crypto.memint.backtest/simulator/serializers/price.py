from rest_framework import serializers
from simulator.models import PriceData, Symbol, TimeFrame


class PriceDataSerializer(serializers.ModelSerializer):
    timeframe = serializers.SlugRelatedField(
        queryset=TimeFrame.objects.all(),
        slug_field="timeframe_id",
    )

    pair = serializers.SlugRelatedField(
        queryset=Symbol.objects.all(),
        slug_field="base_currency",
    )

    class Meta:
        model = PriceData
        fields = [
            "pair",
            "timeframe",
            "timestamp",
            "open",
            "high",
            "low",
            "close",
            "volume",
        ]
