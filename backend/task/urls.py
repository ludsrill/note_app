from django.urls import path, include
from .views import (
    TaskListCreateAPIView,
    TaskRetriveUpdateDestroyAPIView,
)


urlpatterns = [
    path("", TaskListCreateAPIView.as_view()),
    path("<int:pk>/", TaskRetriveUpdateDestroyAPIView.as_view()),
]
