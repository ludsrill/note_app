from django.urls import path
from .views import UserRegistrationCreateAPIView, UserLoginAPIView

urlpatterns = [
    path("registration/", UserRegistrationCreateAPIView.as_view()),
    path("login/", UserLoginAPIView.as_view()),
]
