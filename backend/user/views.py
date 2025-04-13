from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist


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
        try:
            user = User.objects.get(username=request.data["username"])
        except ObjectDoesNotExist:
            return Response({"error": "Bad password"}, status.HTTP_401_UNAUTHORIZED)

        if not user.check_password(request.data["password"]):
            return Response({"error": "Bad password"}, status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)
        response = Response(
            {
                "token": token.key,
            }
        )
        response.set_cookie(
            key="task_cookie",
            secure=True,
            value=token.key,
            max_age=3600,
            samesite=None,
        )
        return response
