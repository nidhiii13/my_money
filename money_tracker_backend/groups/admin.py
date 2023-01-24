from django.contrib import admin

# Register your models here.

from .models import GroupModel, GroupMembers

admin.site.register(GroupModel)
admin.site.register(GroupMembers)