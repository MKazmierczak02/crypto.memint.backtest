from drf_writable_nested import WritableNestedModelSerializer
from simulator.models import ConditionGroup

from .action import ActionSerializer
from .condition import ConditionSerializer


class ConditionGroupSerializer(WritableNestedModelSerializer):
    conditions = ConditionSerializer(many=True)
    action = ActionSerializer()

    class Meta:
        model = ConditionGroup
        fields = ["id", "action", "order", "conditions"]
