from drf_writable_nested import WritableNestedModelSerializer
from .condition import ConditionSerializer
from .action import ActionSerializer
from simulator.models import ConditionGroup


class ConditionGroupSerializer(WritableNestedModelSerializer):
    conditions = ConditionSerializer(many=True)
    action = ActionSerializer()

    class Meta:
        model = ConditionGroup
        fields = ['id', 'action', 'order', 'conditions']
