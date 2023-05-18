import datetime

from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.hashers import make_password
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import User
from lifelogger import settings


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user.last_login = datetime.datetime.now()
            user.save()
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid username or password.'}, status=401)


class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = make_password(request.data.get('password'))
        email = request.data.get('email')
        gender = request.data.get('gender')
        # avatar = request.data.get('avatar')
        # school = request.data.get('school')
        phone_number = request.data.get('phone_number')
        if not all([username, password, email, gender, phone_number]):
            return Response({'message': 'lack params.', 'success': False})
        if User.objects.filter(username=username):
            return Response({'message': 'invalid username.', 'success': False})
        if User.objects.filter(email=email):
            return Response({'message': 'invalid email.', 'success': False})
        if User.objects.filter(phone_number=phone_number):
            return Response({'message': 'invalid email.', 'success': False})
        User.objects.create_user(username=username, password=password
                                 , email=email, gender=gender, phone_number=phone_number
                                 )
        return Response({'message': 'User registered successfully.', 'success': True})


class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')

        form = PasswordResetForm({'email': email})

        if form.is_valid():
            opts = {
                'use_https': request.is_secure(),
                'from_email': settings.EMAIL_HOST_USER,
                'email_template_name': 'password_reset_email.html',
                'subject_template_name': 'password_reset_subject.txt',
            }
            form.save(**opts)
            return Response({'message': 'Password reset email sent.'})
        else:
            return Response({'errors': form.errors}, status=400)
