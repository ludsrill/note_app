from django.urls import path, include
from .views import TaskListView


urlpatterns = [
    path("", TaskListView.as_view()),
]
