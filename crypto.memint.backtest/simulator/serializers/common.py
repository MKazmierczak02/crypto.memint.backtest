from rest_framework import serializers


class ControlIdSerializer(serializers.Serializer):
    id = serializers.IntegerField(
        help_text="Primary key of the endpoint object handling"
    )
