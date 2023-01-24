from django.shortcuts import render
from .models import FriendModel
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .serializers import FriendSerializer
from users.models import UserModel
# Create your views here.


@api_view(['GET'])
def getallFriends(request, pk):
    friends = []
    for friend in FriendModel.objects.filter(user_id=pk) | FriendModel.objects.filter(friend_id=pk):
        data = {
            "user_id": friend.user_id.id != int(pk) and friend.user_id.id or friend.friend_id.id != int(pk) and friend.friend_id.id,
            "username": friend.user_id.id != int(pk) and friend.user_id.username or friend.friend_id.id != int(pk) and friend.friend_id.username,
            "amount_owed": friend.user_id.id == int(pk) and friend.amount_owed or friend.friend_id.id == int(pk) and -friend.amount_owed
        }
        friends.append(data)
    return JsonResponse({"friends": friends}, status=200)

@api_view(['POST'])
def addFriend(request):
    user_id = UserModel.objects.get(user_id=request.POST["user_id"])
    friend_id = UserModel.objects.get(user_id=request.POST["friend_id"])
    friend_object = FriendModel.objects.create(user_id=user_id, friend_id=friend_id,amount_owed=0)
    friend_object.save()
    return JsonResponse({"message": "Friend added successfully"}, status=200)
