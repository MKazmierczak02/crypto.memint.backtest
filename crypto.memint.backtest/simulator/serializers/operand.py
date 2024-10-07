from drf_writable_nested import WritableNestedModelSerializer
from rest_framework import serializers

from .indicator import TechnicalIndicatorSerializer
from simulator.models import Operand


class OperandSerializer(WritableNestedModelSerializer):
    indicator = TechnicalIndicatorSerializer(required=False, allow_null=True)
    constant_value = serializers.FloatField(required=False, allow_null=True)

    class Meta:
        model = Operand
        fields = ['id', 'operand_type', 'indicator', 'constant_value']

    def validate(self, data):
        operand_type = data.get('operand_type')
        indicator = data.get('indicator')
        constant_value = data.get('constant_value')

        if operand_type == 'indicator':
            if not indicator:
                raise serializers.ValidationError({
                    'indicator': "The 'indicator' field is required when 'operand_type' is 'indicator'."
                })
            if constant_value is not None:
                raise serializers.ValidationError({
                    'constant_value': "The 'constant_value' field must be empty when 'operand_type' is 'indicator'."
                })
        elif operand_type == 'constant':
            if constant_value is None:
                raise serializers.ValidationError({
                    'constant_value': "The 'constant_value' field is required when 'operand_type' is 'constant'."
                })
            if indicator is not None:
                raise serializers.ValidationError({
                    'indicator': "The 'indicator' field must be empty when 'operand_type' is 'constant'."
                })
        elif operand_type in ['current_price', 'profit']:
            if indicator is not None or constant_value is not None:
                raise serializers.ValidationError({
                    'non_field_errors': "The 'indicator' and 'constant_value' fields must be empty when "
                                        "'operand_type' is 'current_price' or 'profit'."
                })
        else:
            raise serializers.ValidationError({
                'operand_type': "Unknown operand type."
            })
        return data
