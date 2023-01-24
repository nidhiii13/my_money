from django.shortcuts import render
from .models import UserModel
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserDetailSerializer
# Create your views here.

@api_view(['POST'])
def signup(request):
    username = request.POST['username']
    password = request.POST['password']
    email = request.POST['email']
    phone_no = request.POST['phone_no']
    budget = request.POST['budget']
    try :
        django_user = User.objects.create_user(username=username, password=password, email=email)
        token = Token.objects.create(user=django_user)
        token.save()
        user = UserModel.objects.create(user_id=django_user, username=username, email=email, phone_no=phone_no, budget=budget)
        user.save()
    except Exception as e:
        return JsonResponse({'message': str(e)},status=500)
    return JsonResponse({'message': 'User created successfully'}, status=200)

@api_view(['POST'])
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        user = authenticate(username=username, password=password)
        user_id = UserModel.objects.get(user_id=user)
        if user is not None:
            token = Token.objects.get(user=user)
            return JsonResponse({'message': 'User logged in successfully', 'token': token.key, 'user_id': user_id.user_id.id}, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=401)
            
@api_view(['GET'])
def getallUsers(request,pk):
    users = []
    for user in UserModel.objects.all():
        if user.user_id.id != int(pk):
            user_serializer = UserSerializer(user)
            users.append(user_serializer.data)       
    return JsonResponse({'users': users}, status=200)

@api_view(['GET'])
def getUser(request,pk):
    user = UserModel.objects.get(user_id=pk)
    user_serializer = UserDetailSerializer(user)
    return JsonResponse({'user_data': user_serializer.data}, status=200)
    

