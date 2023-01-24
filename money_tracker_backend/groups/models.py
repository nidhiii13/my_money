from django.db import models
from users.models import UserModel
# Create your models here.
class GroupModel(models.Model):
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=20)
    group_description = models.CharField(max_length=100)
    total_amount = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.group_id)

class GroupMembers(models.Model):
    group = models.ForeignKey(GroupModel, on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)