from django.urls import path

from .views import MyTokenObtainPairView, UserProfileView, signup_view


urlpatterns = [
    path('users/signup', signup_view, name='signup'),
    path('users/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile', UserProfileView.as_view(), name='user_profile'),
]
