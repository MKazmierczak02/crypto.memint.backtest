from rest_framework import serializers
from simulator.models import Action


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = "__all__"

    def create(self, validated_data):
        action, created = Action.objects.get_or_create(
            action_type=validated_data['action_type'],
            parameters=validated_data.get('parameters', {})
        )
        return action
