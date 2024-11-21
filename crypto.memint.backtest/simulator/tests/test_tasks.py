from django.test import TestCase
from unittest.mock import patch
from django.utils import timezone
from simulator.models import Strategy, Symbol, TimeFrame, Simulation
from simulator.tasks.analyze import analyze_market_data
from decimal import Decimal
from django.contrib.auth import get_user_model

User = get_user_model()


class AnalyzeMarketDataTaskTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass123"
        )
        self.strategy = Strategy.objects.create(
            name="Test Strategy",
            user=self.user,
            description="A test strategy",
            private=True,
        )
        self.symbol = Symbol.objects.create(base_currency="BTC", quote_currency="USDT")
        self.timeframe = TimeFrame.objects.create(
            timeframe_id="1h", description="1 Hour"
        )
        self.simulation = Simulation.objects.create(
            strategy=self.strategy,
            symbol=self.symbol,
            timeframe=self.timeframe,
            data_from=timezone.now().date(),
            data_to=timezone.now().date(),
            leverage=2,
            initial_balance=Decimal("10000.00"),
            fixed_trade_value=Decimal("1000.00"),
            max_positions=5,
            status="Ready",
        )

    @patch("simulator.models.Simulation.run")
    def test_analyze_market_data_task(self, mock_run):
        analyze_market_data(self.simulation.id)
        mock_run.assert_called_once()
