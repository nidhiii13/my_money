from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

# Create your models here.

class UserModel(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=50)
    phone_regex = RegexValidator(regex=r'^[6-9]\d{9}$', message=" 10 digits allowed.")
    phone_no = models.CharField(validators=[phone_regex],max_length=10)
    budget = models.FloatField(blank=True, null=True)
    amount_spent = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user_id)