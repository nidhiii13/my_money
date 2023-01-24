from .models import FriendModel
from rest_framework import serializers

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendModel
        fields = 'user_id', 'friend_id'
        depth = 1