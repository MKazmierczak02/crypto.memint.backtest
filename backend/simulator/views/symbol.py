from rest_framework import viewsets
from ..models import Symbol
from ..serializers import SymbolSerializer
from ..permissions import IsAdminUserOrReadOnly


class SymbolViewSet(viewsets.ModelViewSet):
    serializer_class = SymbolSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        # return Strategy.objects.filter(user=self.request.user)
        return Symbol.objects.all()
