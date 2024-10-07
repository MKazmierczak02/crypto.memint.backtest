from simulator.models import TechnicalIndicator
from drf_writable_nested import WritableNestedModelSerializer


class TechnicalIndicatorSerializer(WritableNestedModelSerializer):
    class Meta:
        model = TechnicalIndicator
        fields = "__all__"

    def update(self, instance, validated_data):
        parameters_data = validated_data.pop('parameters', None)

        if parameters_data:
            for key, value in parameters_data.items():
                instance.parameters[key] = value
            instance.save()

        return super().update(instance, validated_data)
