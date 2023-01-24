from django.urls import path
from .views import *

urlpatterns = [
    path('createGroup/', createGroup),
    path('getAllGroups/<str:user_id>/', getallGroups),
    path('addGroupMembers/', addGroupMembers),
    path('getGroupInfo/<str:group_id>/', getGroupInfo),
    path('deleteGroup/<str:group_id>/', deleteGroup),
    path('getGroupMembers/<str:group_id>/', getGroupMembers),
]