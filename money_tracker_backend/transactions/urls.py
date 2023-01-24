from django.urls import path
from .views import *

urlpatterns = [
    path('addTransaction/', addTransaction),
    path('getAllUserTransactions/<str:user_id>', getAllUserTransactions),
    path('addGroupTransaction/', addGroupTransaction),
    path('getGroupTransactions/<str:group_id>', getGroupTransactions),
    path('getIndividualTransaction/<str:id>/<str:is_group>/', getIndividualTransaction),
    path('updateTransaction/<str:id>/', updateTransaction),
    path('deleteTransaction/<str:id>/', deleteTransaction),
]
