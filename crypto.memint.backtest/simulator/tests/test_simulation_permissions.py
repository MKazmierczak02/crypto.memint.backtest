from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from simulator.models import Strategy, Symbol, TimeFrame, Simulation
from django.contrib.auth import get_user_model
from decimal import Decimal

User = get_user_model()


class SimulationPermissionsTest(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            email="user1@example.com", password="pass123"
        )
        self.user2 = User.objects.create_user(
            email="user2@example.com", password="pass123"
        )
        self.strategy1 = Strategy.objects.create(
            name="Strategy 1",
            user=self.user1,
            description="First strategy",
            private=True,
        )
        self.symbol = Symbol.objects.create(base_currency="BTC", quote_currency="USDT")
        self.timeframe = TimeFrame.objects.create(
            timeframe_id="1h", description="1 Hour"
        )
        self.simulation1 = Simulation.objects.create(
            strategy=self.strategy1,
            symbol=self.symbol,
            timeframe=self.timeframe,
            data_from="2024-01-01",
            data_to="2024-12-31",
            leverage=2,
            initial_balance=Decimal("10000.00"),
            fixed_trade_value=Decimal("1000.00"),
            max_positions=5,
        )
        self.client.force_authenticate(user=self.user1)

    def test_user_cannot_access_others_simulation(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("simulations-detail", args=[self.simulation1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_access_own_simulation(self):
        url = reverse("simulations-detail", args=[self.simulation1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_delete_others_simulation(self):
        self.client.force_authenticate(user=self.user2)
        url = reverse("simulations-detail", args=[self.simulation1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_delete_own_simulation(self):
        url = reverse("simulations-detail", args=[self.simulation1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
