from django.shortcuts import render
from .models import GroupModel, GroupMembers
from users.models import UserModel
from friends.models import FriendModel
from transactions.models import TransactionModel
from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from .serializers import GroupSerializer
# Create your views here.

@api_view(['POST'])
def createGroup(request):
    group_name = request.POST["group_name"]
    group_description = request.POST["group_description"]
    group_object = GroupModel.objects.create(group_name=group_name, group_description=group_description)
    group_object.save() 
    members = json.loads(request.POST["members"])
    for member in members:
        print(member)
        user_object = UserModel.objects.get(user_id=member['user_id'])
        group_members_object = GroupMembers.objects.create(group=group_object, user=user_object)
        group_members_object.save()
    return JsonResponse({"message": "Group created successfully"}, status=200)

@api_view(['POST'])
def addGroupMembers(request):
    """ members = request.POST["members"]
    group_id = request.POST["group_id"]
    group_object = GroupModel.objects.get(group_id=group_id)
    group_members_object = GroupMembers.objects.create(group=group_object, user=user_object)
    group_members_object.save()
    members = []
    for member in GroupMembers.objects.filter(group=group_object):
        members.append(member.user.username)
    return JsonResponse({"message": "Group members added successfully", "members": members}, status=200) """

@api_view(['GET'])
def getallGroups(request, user_id):
    user_object = UserModel.objects.get(user_id=user_id)
    groups = []
    for group in GroupMembers.objects.filter(user=user_object):
        group_object = GroupModel.objects.get(group_id=group.group.group_id)
        group_serializer = GroupSerializer(group_object)
        groups.append(group_serializer.data)
    return JsonResponse({"groups": groups}, status=200)

@api_view(['GET'])
def getGroupInfo(request, group_id):
    group_object = GroupModel.objects.get(group_id=group_id)
    group_members = []
    for group_member in GroupMembers.objects.filter(group=group_object):
        group_members.append(group_member.user.username)
    print(group_members)
    group_serializer = GroupSerializer(group_object)
    group_transactions = []
    """ for group_transaction in TransactionModel.objects.filter(group_id=group_id):
        group_transactions.append({
            "transaction_id": group_transaction.transaction_id,
            "from_id": group_transaction.from_id,
            "category": group_transaction.category,
            "amount": group_transaction.amount,
        })  """
    return JsonResponse({"group": group_serializer.data,"group_members":group_members,"group_transactions":group_transactions}, status=200)

@api_view(['DELETE'])
def deleteGroup(request, group_id):
    group_object = GroupModel.objects.get(group_id=group_id)
    group_object.delete()
    return JsonResponse({"message": "Group deleted successfully"}, status=200)

@api_view(['GET'])
def getGroupMembers(request, group_id):
    group_object = GroupModel.objects.get(group_id=group_id)
    group_members = []
    for group_member in GroupMembers.objects.filter(group=group_object):
        group_members.append({
            "user_id": group_member.user.user_id.id,
            "username": group_member.user.username,
        })
    return JsonResponse({"group_members": group_members}, status=200)


