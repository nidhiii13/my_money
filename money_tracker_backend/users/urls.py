from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('getallUsers/<str:pk>/', getallUsers),
    path('getUser/<str:pk>/', getUser),
]