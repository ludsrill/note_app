from rest_framework import generics
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterUserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist


class UserRegistrationCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()

        if serializer.errors:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(request.data, status.HTTP_200_OK)


class UserLoginAPIView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )

        if not user:
            return Response(
                {"error": "Invalid Credentials"}, status.HTTP_401_UNAUTHORIZED
            )

        user_data = UserSerializer(user).data
        token, _ = Token.objects.get_or_create(user=user)
        response = Response(
            {
                "token": token.key,
                "user": user_data,
            }
        )
        response.set_cookie(
            key="task_cookie",
            secure=True,
            value=token.key,
            max_age=3600,
            samesite="None",
        )
        return response
