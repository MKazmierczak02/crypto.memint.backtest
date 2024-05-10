from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Strategy, Symbol


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class StrategySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Strategy
        fields = ['id', 'name', 'user', 'created_at', 'updated_at', 'description', 'active']
        read_only_fields = ['created_at', 'updated_at']


class SymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symbol
        fields = ['id', 'crypto', 'vs_currency']