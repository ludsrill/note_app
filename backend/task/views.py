from rest_framework import generics, mixins, status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 5


class TaskListCreateAPIView(generics.ListCreateAPIView, generics.GenericAPIView):
    queryset = Task.objects.all().order_by("id")
    serializer_class = TaskSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        return Task.objects.filter(username=self.request.user)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data["username"], str):
            username = User.objects.get(username=request.data["username"])

        serializer = TaskSerializer(
            data={
                "task": request.data["task"],
                "title": request.data["title"],
                "username": username.id,
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Success"}, status.HTTP_200_OK)


class TaskRetriveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if isinstance(request.data["username"], str):
            username = User.objects.get(username=request.data["username"])

        serializer = self.serializer_class(
            data={
                "id": request.data["id"],
                "username": username.id,
                "title": request.data["title"],
                "task": request.data["task"],
                "state": request.data["state"],
                "priority": request.data["priority"],
            }
        )

        task = Task.objects.filter(id=request.data["id"])
        serializer.is_valid(raise_exception=True)
        task.update(**serializer.validated_data)

        return Response({"message": "Sucess"}, status.HTTP_200_OK)
