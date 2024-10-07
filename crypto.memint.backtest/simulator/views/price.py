from rest_framework import viewsets

from ..models import PriceData
from ..permissions import IsAdminUser
from simulator.serializers.price import PriceDataSerializer


class PriceViewSet(viewsets.ModelViewSet):
    queryset = PriceData.objects.all()
    serializer_class = PriceDataSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        interval = self.request.query_params.get("interval")
        base = self.request.query_params.get("base")
        quote = self.request.query_params.get("quote")
        if base and quote:
            return PriceData.objects.filter(
                pair__base_currency=base, pair__quote_currency=quote, timeframe__timeframe_id=interval.lower()
            )
        return PriceData.objects.all()
