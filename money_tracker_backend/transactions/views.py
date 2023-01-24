from django.shortcuts import render
from .models import TransactionModel
from users.models import UserModel
from friends.models import FriendModel
from groups.models import GroupModel
from .serializers import TransactionSerializer
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import uuid


# Create your views here.

@api_view(['POST'])
def addTransaction(request):
    to_id = UserModel.objects.get(user_id=request.POST["to_id"])
    from_id = UserModel.objects.get(user_id=request.POST["from_id"])
    amount = request.POST["amount"]
    comments = request.POST["comments"]
    transaction_type = "CREDIT"
    transaction = TransactionModel.objects.create(
        to_id=to_id, from_id=from_id, amount=amount, comments=comments, transaction_type=transaction_type)
    transaction.save()
    try:
        friend = FriendModel.objects.get(
            user_id=request.POST["from_id"], friend_id=request.POST["to_id"])
        if friend.amount_owed == None:
            friend.amount_owed = float(amount)
        else:
            friend.amount_owed = friend.amount_owed + float(amount)
    except:
        friend = FriendModel.objects.get(
            user_id=request.POST["to_id"], friend_id=request.POST["from_id"])
        if friend.amount_owed == None:
            friend.amount_owed = -float(amount)
        else:
            friend.amount_owed = friend.amount_owed - float(amount)
    friend.save()
    user = UserModel.objects.get(user_id=request.POST["from_id"])
    if user.amount_spent == None:
        user.amount_spent = float(amount)
    else:
        user.amount_spent = user.amount_spent + float(amount)
    user.save()
    return JsonResponse({"message": "Transaction added successfully"}, status=200)


@api_view(['GET'])
def getAllUserTransactions(request, user_id):
    from_transactions = TransactionModel.objects.filter(from_id=user_id)
    to_transactions = TransactionModel.objects.filter(to_id=user_id)
    transactions = list(from_transactions) + \
        list(to_transactions) 
    t = []
    for transaction in transactions:
        if transaction.group_id != None:
            entry = {
                "transaction_id": transaction.transaction_id,
                "group_id": transaction.group_id.group_id,
                "group_name": GroupModel.objects.get(group_id=transaction.group_id.group_id).group_name,
                "from_name": UserModel.objects.get(user_id=transaction.from_id.user_id).username,
                "to_name": UserModel.objects.get(user_id=transaction.to_id.user_id).username,
                "from_id": transaction.from_id.user_id.id,
                "to_id": transaction.to_id.user_id.id,
                "amount": transaction.amount,
                "category": transaction.category,
                "group_transaction_id": transaction.group_transaction_id,
            }
        else:
            entry = {
                "transaction_id": transaction.transaction_id,
                "from_name": UserModel.objects.get(user_id=transaction.from_id.user_id).username,
                "to_name": UserModel.objects.get(user_id=transaction.to_id.user_id).username,
                "from_id": transaction.from_id.user_id.id,
                "to_id": transaction.to_id.user_id.id,
                "amount": transaction.amount,
                "transaction_type": transaction.transaction_type,
                "category": transaction.category,
            }
        t.append(entry)
    return JsonResponse({"transactions": t}, status=200)


@api_view(['POST'])
def addGroupTransaction(request):
    from_id = UserModel.objects.get(user_id=request.POST["from_id"])
    group_id = GroupModel.objects.get(group_id=request.POST["group_id"])
    amount = request.POST["amount"]
    if group_id.total_amount == None:
        group_id.total_amount = float(amount)
    else:
        group_id.total_amount = group_id.total_amount + float(amount)
    group_id.save()
    category = request.POST["category"]
    members = json.loads(request.POST["members"])
    print(members)
    print(from_id)
    flag = 0
    for member in members:
        if int(member['user_id']) == int(request.POST["from_id"]):
            flag = 1
            break
    if flag == 0:
        amount_split = float(amount)/len(members)
    else:
        print('hiii')
        amount_split = float(amount)/len(members)
        amount_split = (float(amount)-amount_split)/(len(members)-1)
    uid = uuid.uuid4()
    for member in members:
        if int(member['user_id']) == int(request.POST["from_id"]):
            print('bye')
            continue
        user_id = UserModel.objects.get(user_id=request.POST["from_id"])
        friend_id = UserModel.objects.get(user_id=member['user_id'])
        if FriendModel.objects.filter(user_id=user_id, friend_id=friend_id).exists():
            friend = FriendModel.objects.get(
                user_id=user_id, friend_id=friend_id)
            if friend.amount_owed == None:
                friend.amount_owed = float(amount_split)
            else:
                friend.amount_owed = friend.amount_owed + float(amount_split)
        elif FriendModel.objects.filter(user_id=friend_id, friend_id=user_id).exists():
            friend = FriendModel.objects.get(
                user_id=friend_id, friend_id=user_id)
            if friend.amount_owed == None:
                friend.amount_owed = -float(amount_split)
            else:
                friend.amount_owed = friend.amount_owed - float(amount_split)
        else:
            friend = FriendModel.objects.create(
                user_id=user_id,friend_id=friend_id, amount_owed=float(amount_split))
        friend.save()
        user = UserModel.objects.get(user_id=member['user_id'])
        if user.amount_spent == None:
            user.amount_spent = float(amount_split)
        else:
            user.amount_spent = user.amount_spent + float(amount_split)
        user.save()
        transaction = TransactionModel.objects.create(
            from_id=from_id, to_id=friend_id, group_id=group_id, amount=amount_split, category=category)
        transaction.group_transaction_id = uid
        if flag == 1:
            transaction.is_payer_included = True
        transaction.save()
    return JsonResponse({"message": "Transaction added successfully"}, status=200)



@api_view(['GET'])
def getGroupTransactions(request, group_id):
    transactions = TransactionModel.objects.filter(group_id=group_id)
    t = []
    type = {}
    amount = {}
    to={}

    for transaction in transactions:
        amount[transaction.group_transaction_id] = amount.get(transaction.group_transaction_id, 0) + transaction.amount
        to[transaction.group_transaction_id] = to.get(transaction.group_transaction_id, []) + [UserModel.objects.get(user_id=transaction.to_id.user_id).username]
        type[transaction.group_transaction_id] = {
            "group_transaction_id": transaction.group_transaction_id,
            "amount": amount[transaction.group_transaction_id],
            "category": transaction.category,
            "from_name": UserModel.objects.get(user_id=transaction.from_id.user_id).username,
            "group_id": transaction.group_id.group_id,
            "to_name": to[transaction.group_transaction_id],
            "is_payer_included": transaction.is_payer_included,
            "amount_split": transaction.amount,
            "created_at": transaction.created_at,
            "updated_at": transaction.updated_at,
        }
    for key in type:
        if type[key]['is_payer_included'] == True:
            type[key]['amount'] = type[key]['amount'] + type[key]['amount_split']
            type[key]['to_name'] = type[key]['to_name'] + [UserModel.objects.get(user_id=transaction.from_id.user_id).username]
    
    for key in type:
        t.append(type[key])

    return JsonResponse({"transactions": t}, status=200)



@api_view(['GET'])
def getIndividualTransaction(request,id,is_group):
    if is_group == 'true':
        transactions = TransactionModel.objects.filter(group_transaction_id=id)
        to={}
        ammount = {}
        for transaction in transactions:
            to[transaction.group_transaction_id] = to.get(transaction.group_transaction_id, []) + [UserModel.objects.get(user_id=transaction.to_id.user_id).username]
            ammount[transaction.group_transaction_id] = ammount.get(transaction.group_transaction_id, 0) + transaction.amount
            entry = {
                "group_transaction_id": transaction.group_transaction_id,
                "from_name": UserModel.objects.get(user_id=transaction.from_id.user_id).username,
                "to_name": to[transaction.group_transaction_id],
                "amount": ammount[transaction.group_transaction_id],
                "category": transaction.category,
                "comments": transaction.comments,
                "is_payer_included": transaction.is_payer_included,
                "amount_split": transaction.amount,
                "group_name": transaction.group_id.group_name,
                "group_id": transaction.group_id.group_id,
            }
        
        if entry['is_payer_included'] == True:
            entry['amount'] = entry['amount'] + entry['amount_split']
            entry['to_name'] = entry['to_name'] + [UserModel.objects.get(user_id=transaction.from_id.user_id).username]
    else:
        transaction = TransactionModel.objects.get(transaction_id=id)
        entry = {
            "transaction_id": transaction.transaction_id,
            "from_name": UserModel.objects.get(user_id=transaction.from_id.user_id).username,
            "to_name": UserModel.objects.get(user_id=transaction.to_id.user_id).username,
            "amount": transaction.amount,
            "category": transaction.category,
            "comments": transaction.comments,
        }
    
    return JsonResponse({"transaction": entry}, status=200)

@api_view(['PUT'])
def updateTransaction(request, id):
    old_amount = float(request.POST.get('old_amount'))
    new_amount = float(request.POST.get('new_amount'))
    from_name = request.POST.get('from_name')
    to_name = json.loads(request.POST.get('to_name'))
    group_id = request.POST.get('group_id')
    group = GroupModel.objects.get(group_id=group_id)
    group.total_amount = group.total_amount + float(new_amount) - float(old_amount)
    group.save()    
    print('from_name', from_name)
    user = UserModel.objects.get(username=from_name)
    user.amount_spent = user.amount_spent + float(new_amount) - float(old_amount)
    user.save()
    length = request.POST.get('length')
    is_payer_included = request.POST.get('is_payer_included')
    print('is_payer_included', is_payer_included)
    if is_payer_included == 'true':
        amount_split = (new_amount-old_amount)/float(length)
    else:
        amount_split = (new_amount-old_amount)/(float(length)-1)
    transaction = TransactionModel.objects.filter(group_transaction_id=id)
    for t in transaction:
        t.amount = t.amount + amount_split
        t.save()
    for name in to_name:
       if FriendModel.objects.filter(user_id=user, friend_id=UserModel.objects.get(username=name)).exists():
            friend = FriendModel.objects.get(user_id=user, friend_id=UserModel.objects.get(username=name))
            friend.amount_owed = friend.amount_owed + amount_split
            friend.save()
       elif FriendModel.objects.filter(user_id=UserModel.objects.get(username=name), friend_id=user).exists():
            friend = FriendModel.objects.get(user_id=UserModel.objects.get(username=name), friend_id=user)
            friend.amount_owed = friend.amount_owed - amount_split
            friend.save() 
    return JsonResponse({"message": "Transaction updated successfully"}, status=200)

@api_view(['DELETE'])
def deleteTransaction(request, id):
    transaction = TransactionModel.objects.filter(group_transaction_id=id)
    for t in transaction:
        t.delete()
    return JsonResponse({"message": "Transaction deleted successfully"}, status=200)