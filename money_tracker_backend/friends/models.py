from django.db import models
from users.models import UserModel
# Create your models here.

class FriendModel(models.Model):
    user_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    friend_id = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='friend_id')
    amount_owed = models.FloatField()

    def __str__(self):
        return str(self.user_id)