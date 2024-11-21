from django.test import TestCase
from decimal import Decimal
from django.utils import timezone
from simulator.models import Strategy, Symbol, TimeFrame, Simulation
from django.contrib.auth import get_user_model

User = get_user_model()


class StrategyModelTest(TestCase):
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

    def test_strategy_creation(self):
        self.assertEqual(self.strategy.name, "Test Strategy")
        self.assertEqual(self.strategy.description, "A test strategy")
        self.assertTrue(self.strategy.private)


class SymbolModelTest(TestCase):
    def setUp(self):
        self.symbol = Symbol.objects.create(base_currency="BTC", quote_currency="USDT")

    def test_symbol_creation(self):
        self.assertEqual(str(self.symbol), "BTCUSDT")

    def test_unique_together(self):
        with self.assertRaises(Exception):
            Symbol.objects.create(base_currency="BTC", quote_currency="USDT")


class SimulationModelTest(TestCase):
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
        self.symbol = Symbol.objects.create(base_currency="ETH", quote_currency="USDT")
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
        )

    def test_simulation_creation(self):
        self.assertEqual(self.simulation.status, "Ready")
        self.assertEqual(self.simulation.leverage, 2)

    def test_simulation_str(self):
        self.assertEqual(
            str(self.simulation),
            f"#{self.simulation.id} | Simulation of {self.strategy.name}",
        )
