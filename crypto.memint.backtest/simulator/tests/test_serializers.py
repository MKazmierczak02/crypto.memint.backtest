from django.test import TestCase
from decimal import Decimal
from simulator.models import Strategy, Symbol, TimeFrame, Simulation
from simulator.serializers.simulation import SimulationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class SimulationSerializerTest(TestCase):
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
        self.simulation_data = {
            "strategy_id": self.strategy.id,
            "symbol": self.symbol.base_currency,
            "timeframe": self.timeframe.timeframe_id,
            "data_from": "2024-01-01",
            "data_to": "2024-12-31",
            "leverage": 2,
            "initial_balance": "10000.00",
            "fixed_trade_value": "1000.00",
            "max_positions": 5,
        }

    def test_serializer_valid_data(self):
        serializer = SimulationSerializer(data=self.simulation_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        simulation = serializer.save()
        self.assertEqual(simulation.strategy, self.strategy)
        self.assertEqual(simulation.symbol, self.symbol)
        self.assertEqual(simulation.leverage, 2)

    def test_serializer_invalid_date(self):
        invalid_data = self.simulation_data.copy()
        invalid_data["data_from"] = "2025-01-01"
        invalid_data["data_to"] = "2024-12-31"
        serializer = SimulationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)

    def test_get_symbol_code(self):
        simulation = Simulation.objects.create(
            strategy=self.strategy,
            symbol=self.symbol,
            timeframe=self.timeframe,
            data_from="2024-01-01",
            data_to="2024-12-31",
            leverage=2,
            initial_balance=Decimal("10000.00"),
            fixed_trade_value=Decimal("1000.00"),
            max_positions=5,
        )
        serializer = SimulationSerializer(simulation)
        self.assertEqual(serializer.data["symbol_code"], str(self.symbol))
