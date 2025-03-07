from rest_framework import generics, mixins
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response


class TaskListView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
