from rest_framework import serializers
from simulator.models import Symbol


class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbol
        fields = ["id", "base_currency", "quote_currency"]
        read_only_fields = ["id", "base_currency", "quote_currency"]
