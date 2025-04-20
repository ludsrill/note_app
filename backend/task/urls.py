from django.urls import path, include
from .views import (
    TaskListCreateAPIView,
    TaskRetriveUpdateDestroyAPIView,
    TaskListAdminAPIView,
)


urlpatterns = [
    path("", TaskListCreateAPIView.as_view()),
    path("admin/", TaskListAdminAPIView.as_view()),
    path("<int:pk>/", TaskRetriveUpdateDestroyAPIView.as_view()),
]
