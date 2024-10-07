from drf_writable_nested import WritableNestedModelSerializer
from simulator.models import Condition

from .operand import OperandSerializer


class ConditionSerializer(WritableNestedModelSerializer):
    left_operand = OperandSerializer()
    right_operand = OperandSerializer()

    class Meta:
        model = Condition
        fields = [
            "id",
            "left_operand",
            "operator",
            "right_operand",
        ]
