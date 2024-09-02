from rest_framework import viewsets

from ..models import PriceData
from ..permissions import IsAdminUserOrReadOnly
from ..serializers import PriceDataSerializer


class PriceViewSet(viewsets.ModelViewSet):
    queryset = PriceData.objects.all()
    serializer_class = PriceDataSerializer
    permission_classes = (IsAdminUserOrReadOnly,)

    def get_queryset(self):
        crypto = self.request.query_params.get("crypto")
        vs_currency = self.request.query_params.get("vs_currency")
        if crypto and vs_currency:
            return PriceData.objects.filter(
                symbol__crypto=crypto, symbol__vs_currency=vs_currency
            )
        return PriceData.objects.none()
