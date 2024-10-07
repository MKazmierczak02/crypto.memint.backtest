from .condition_group import ConditionGroupSerializer
from simulator.models import Strategy
from drf_writable_nested import WritableNestedModelSerializer


class StrategySerializer(WritableNestedModelSerializer):
    condition_groups = ConditionGroupSerializer(many=True)

    class Meta:
        model = Strategy
        fields = ['id', 'name', 'description', 'condition_groups', 'private', 'created_at']
