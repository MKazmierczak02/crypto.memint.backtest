from .position import PositionSerializer
from .price import PriceDataSerializer
from ..models import Simulation, PriceData
from django.db.models import Sum, Count, Q
from decimal import Decimal
from rest_framework import serializers


class SimulationSummarySerializer(serializers.ModelSerializer):
    positions = PositionSerializer(many=True, read_only=True)
    total_profit = serializers.SerializerMethodField()
    total_trades = serializers.SerializerMethodField()
    success_rate = serializers.SerializerMethodField()
    price_data = serializers.SerializerMethodField()
    balance_over_time = serializers.SerializerMethodField()

    class Meta:
        model = Simulation
        fields = [
            'id',
            'strategy',
            'symbol',
            'timeframe',
            'data_from',
            'data_to',
            'leverage',
            'initial_balance',
            'final_balance',
            'roi',
            'max_drawdown',
            'max_positions',
            'created_at',
            'start_date',
            'end_date',
            'status',
            'positions',
            'total_profit',
            'total_trades',
            'success_rate',
            'price_data',
            'balance_over_time',
        ]

    def get_total_profit(self, obj):
        total_profit = obj.positions.aggregate(
            total=Sum('realized_profit')
        )['total'] or Decimal('0.0')
        return total_profit

    def get_total_trades(self, obj):
        return obj.positions.count()

    def get_success_rate(self, obj):
        total_trades = obj.positions.count()
        if total_trades == 0:
            return 0
        successful_trades = obj.positions.filter(realized_profit__gt=0).count()
        success_rate = (successful_trades / total_trades) * 100
        return round(success_rate, 2)

    def get_price_data(self, obj):
        filter_criteria = {
            'pair': obj.symbol,
            'timeframe': obj.timeframe,
        }

        if obj.data_from:
            filter_criteria['timestamp__gte'] = obj.data_from
        if obj.data_to:
            filter_criteria['timestamp__lte'] = obj.data_to

        price_queryset = PriceData.objects.filter(**filter_criteria).order_by('timestamp')
        sampled_prices = price_queryset  # [::10]
        serializer = PriceDataSerializer(sampled_prices, many=True)
        return serializer.data

    def get_balance_over_time(self, obj):
        balance = obj.initial_balance
        balance_data = []
        positions = obj.positions.order_by('entry_timestamp')

        for position in positions:
            balance -= position.fee
            if position.status == 'closed' and position.realized_profit is not None:
                balance += position.realized_profit
                timestamp = position.close_timestamp
            else:
                timestamp = position.entry_timestamp

            balance_data.append({
                'timestamp': timestamp.isoformat(),
                'balance': float(balance),
            })

        return balance_data
