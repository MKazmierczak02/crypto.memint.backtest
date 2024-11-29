from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from simulator.models import TimeFrame, Symbol, Strategy, Condition, ConditionGroup, Action, Operand, TechnicalIndicator, Simulation
from simulator.tasks import fetch_and_save_data
from .serializers import UserSerializer, UserSerializerWithToken, UserSignupSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        del data["access"]
        del data["refresh"]
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


@api_view(["POST"])
def signup_view(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializerWithToken(user)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def init_db(request):
    test_user, created = User.objects.get_or_create(
        email="test@example.com",
        defaults={
            "is_superuser": True,
            "is_staff": True
        }
    )
    if created:
        test_user.set_password("securepassword")
        test_user.save()
    timeframes = [
        {"timeframe_id": "1m", "description": "1 Minute"},
        {"timeframe_id": "5m", "description": "5 Minutes"},
        {"timeframe_id": "15m", "description": "15 Minutes"},
        {"timeframe_id": "1h", "description": "1 Hour"},
        {"timeframe_id": "1d", "description": "1 Day"},
    ]
    try:
        for tf in timeframes:
            TimeFrame.objects.get_or_create(
                timeframe_id=tf["timeframe_id"],
                defaults={"description": tf["description"]}
            )
    except Exception:
        pass
    symbol, _ = Symbol.objects.get_or_create(
        base_currency="BTC",
        quote_currency="USDT"
    )

    # fetch_and_save_data.delay("BTC", "1h", "1 Jan, 2024", "28 Nov, 2024")

    strategy, _ = Strategy.objects.get_or_create(
        name="Sample Strategy",
        user=test_user,
        defaults={
            "description": "This is an initial strategy for moving average crossovers."
        }
    )

    sma_short = TechnicalIndicator.objects.create(
        name="SMA",
        parameters={"length": 20}
    )
    sma_long= TechnicalIndicator.objects.create(
        name="SMA",
        parameters={"length": 50}
    )

    operand_smas, _ = Operand.objects.get_or_create(
        operand_type="indicator",
        indicator=sma_short
    )
    operand_smal, _ = Operand.objects.get_or_create(
        operand_type="indicator",
        indicator=sma_long
    )

    action_buy, _ = Action.objects.get_or_create(action_type="BUY")
    action_sell, _ = Action.objects.get_or_create(action_type="SELL")

    condition_group_buy, _ = ConditionGroup.objects.get_or_create(
        strategy=strategy,
        action=action_buy,
    )
    condition_group_sell, _ = ConditionGroup.objects.get_or_create(
        strategy=strategy,
        action=action_sell,
    )
    Condition.objects.get_or_create(
        condition_group=condition_group_buy,
        left_operand=operand_smas,
        operator="XAB",
        right_operand=operand_smal
    )
    Condition.objects.get_or_create(
        condition_group=condition_group_sell,
        left_operand=operand_smas,
        operator="XBE",
        right_operand=operand_smal
    )
    Simulation.objects.create(
        strategy=strategy,
        symbol=symbol,
        timeframe=TimeFrame.objects.get(timeframe_id="1h"),
        initial_balance=10000,
        fixed_trade_value=100
    )
    return Response({"message": "Database initialized successfully."})
