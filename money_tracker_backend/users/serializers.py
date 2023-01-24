from .models import UserModel
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = 'user_id', 'username'

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = 'user_id', 'username', 'email', 'phone_no', 'budget','amount_spent'
