from django.db import models
from users.models import UserModel
from groups.models import GroupModel
# Create your models here.

class TransactionModel(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    group_transaction_id = models.CharField(max_length=40, blank=True, null=True)
    group_id = models.ForeignKey(GroupModel, on_delete=models.CASCADE, blank=True, null=True)
    from_id = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    to_id = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='to_id')
    transaction_type = models.CharField(max_length=10)
    category = models.CharField(max_length=20,default="OTHER")
    is_payer_included = models.BooleanField(default=False)
    amount = models.FloatField()
    comments = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.transaction_id)