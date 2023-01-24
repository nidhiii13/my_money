from .models import TransactionModel
from rest_framework import serializers

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionModel
        fields = 'to_id', 'from_id', 'amount', 'transaction_type', 'category', 'group_id'