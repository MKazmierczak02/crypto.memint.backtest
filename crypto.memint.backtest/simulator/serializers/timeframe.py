from rest_framework import serializers
from simulator.models import TimeFrame


class TimeFrameSerializer(serializers.ModelSerializer):

    class Meta:
        model = TimeFrame
        fields = "__all__"
