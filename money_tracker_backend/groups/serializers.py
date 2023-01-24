from .models import GroupModel, GroupMembers
from users.models import UserModel
from friends.models import FriendModel
from rest_framework import serializers

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupModel
        fields = 'group_name', 'group_description', 'group_id', 'total_amount'
