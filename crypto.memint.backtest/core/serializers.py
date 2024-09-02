from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return get_user_model().objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ["id", "email", "isAdmin"]

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = get_user_model()
        fields = ["id", "email", "isAdmin", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
