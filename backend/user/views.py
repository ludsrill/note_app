from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


class UserRegistrationCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid()

        if serializer.errors:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data["password"])
        user.save()

        return Response(request.data, status.HTTP_200_OK)


class UserLoginAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data["username"])

        if not user.check_password(request.data["password"]):
            return Response({"error": "Bad password"}, status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key}, status.HTTP_200_OK)
