from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from simulator.models import Strategy, Symbol, TimeFrame, Simulation
from django.contrib.auth import get_user_model
from decimal import Decimal
from rest_framework.test import APIClient
from unittest.mock import patch
from celery.result import AsyncResult

User = get_user_model()


class SimulationViewSetTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
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
            data_from="2024-01-01",
            data_to="2024-12-31",
            leverage=2,
            initial_balance=Decimal("10000.00"),
            fixed_trade_value=Decimal("1000.00"),
            max_positions=5,
        )

    def test_list_simulations(self):
        url = reverse("simulations-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_simulation(self):
        url = reverse("simulations-list")
        data = {
            "strategy_id": self.strategy.id,
            "symbol": self.symbol.base_currency,
            "timeframe": self.timeframe.timeframe_id,
            "data_from": "2024-01-01",
            "data_to": "2024-12-31",
            "leverage": 3,
            "initial_balance": "15000.00",
            "fixed_trade_value": "1500.00",
            "max_positions": 10,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Simulation.objects.count(), 2)
        self.assertEqual(Simulation.objects.latest("id").leverage, 3)

    def test_retrieve_simulation(self):
        url = reverse("simulations-detail", args=[self.simulation.id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.simulation.id)

    def test_update_simulation(self):
        url = reverse("simulations-detail", args=[self.simulation.id])
        data = {
            "data_from": "2024-01-01",
            "data_to": "2024-12-31",
            "leverage": 4,
            "initial_balance": "20000.00",
            "fixed_trade_value": "2000.00",
            "max_positions": 15,
        }
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.simulation.refresh_from_db()
        self.assertEqual(self.simulation.leverage, 4)
        self.assertEqual(self.simulation.initial_balance, Decimal("20000.00"))

    def test_delete_simulation(self):
        url = reverse("simulations-detail", args=[self.simulation.id])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Simulation.objects.count(), 0)


class CustomSimulationAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass123"
        )
        self.client.force_authenticate(user=self.user)
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
            data_from="2024-01-01",
            data_to="2024-12-31",
            leverage=2,
            initial_balance=Decimal("10000.00"),
            fixed_trade_value=Decimal("1000.00"),
            max_positions=5,
            status="Ready",
        )

    @patch("simulator.tasks.analyze.analyze_market_data.delay")
    def test_start_simulation(self, mock_analyze_task):
        url = reverse("start-simulation")
        data = {"id": self.simulation.id}

        mock_task = AsyncResult("fake-task-id")
        mock_task.id = "fake-task-id"
        mock_analyze_task.return_value = mock_task

        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        mock_analyze_task.assert_called_once_with(self.simulation.id)

        self.simulation.refresh_from_db()

        self.assertEqual(self.simulation.task_id, "fake-task-id")
        self.assertEqual(self.simulation.status, "Ready")

    def test_reset_simulation(self):
        self.simulation.status = "Running"
        self.simulation.save()
        url = reverse("reset-simulation")
        data = {"id": self.simulation.id}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.simulation.refresh_from_db()
        self.assertEqual(self.simulation.status, "Ready")
        self.assertIsNone(self.simulation.task_id)

    def test_check_analysis_result(self):
        self.simulation.task_id = "fake_task_id"
        self.simulation.save()
        from unittest.mock import patch
        from celery.result import AsyncResult

        with patch("simulator.views.simulation.AsyncResult") as MockAsyncResult:
            mock_task = MockAsyncResult.return_value
            mock_task.state = "SUCCESS"
            mock_task.result = "result_id_123"
            url = reverse("check-simulation")
            data = {"id": self.simulation.id}
            response = self.client.post(url, data, format="json")
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data["status"], "SUCCESS")
            self.assertEqual(response.data["result"], "result_id_123")

    def test_export_simulation_to_csv(self):
        url = reverse("export-simulation-csv", args=[self.simulation.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], "text/csv")
        self.assertIn("attachment; filename=", response["Content-Disposition"])
