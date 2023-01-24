from django.urls import path
from .views import *

urlpatterns = [
    path('getallFriends/<str:pk>/', getallFriends),
    path('addFriend/', addFriend),
]