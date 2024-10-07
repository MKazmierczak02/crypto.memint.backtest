from rest_framework import viewsets

from ..models import Symbol
from ..permissions import IsAdminUserOrReadOnly
from simulator.serializers.symbol import SymbolSerializer


class SymbolViewSet(viewsets.ModelViewSet):
    serializer_class = SymbolSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return Symbol.objects.all()
