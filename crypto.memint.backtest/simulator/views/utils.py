from rest_framework.response import Response
from rest_framework.views import APIView
from simulator.models import Action, Operand, TechnicalIndicator


class TechnicalIndicatorListView(APIView):
    def get(self, request, *args, **kwargs):
        indicators = TechnicalIndicator.AVAILABLE_PARAMETERS
        return Response(indicators)


class ActionListView(APIView):
    def get(self, request, *args, **kwargs):
        actions = [
            {
                "value": action[0],
                "label": action[1],
                "parameters": Action.ACTION_PARAMETERS[action[0]],
            }
            for action in Action.ACTION_CHOICES
        ]
        return Response(actions)


class OperandTypesListView(APIView):
    def get(self, request, *args, **kwargs):
        condition_types = [
            {"value": operand_type[0], "label": operand_type[1]}
            for operand_type in Operand.OPERAND_TYPE_CHOICES
        ]
        return Response(condition_types)
