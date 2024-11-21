from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse 
from .serializers import registerserializer ,taskserializer
from .models import User,Task
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout,login
from rest_framework import status

# @csrf_exempt
@api_view(['POST']) 
def register_page(request):
    print(request.data)
    serializer1 = registerserializer(data=request.data)
    print(serializer1)
    if serializer1.is_valid():
        serializer1.save()
        return Response({"status":1,"values":serializer1.data})
    return Response("failed")
    

@api_view(['POST'])
def login_page(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username)
    print(password)
    user = User.objects.get(username=username, password=password)
    print(user)
    if user is not None:
        user_data= registerserializer(user).data
        print(user_data)
        return Response({"status": 1, "values":user_data,"message": "Login successful"})
    else:
        return Response({"status": 0, "values":user_data, "message": "Login failed"})
    
@api_view(['POST']) 
def task_page(request):
    print(request.data)
    serializer1 = taskserializer(data=request.data)
    print(serializer1)
    if serializer1.is_valid():
        serializer1.save()
        return Response({"status":1,"values":serializer1.data})
    return Response("failed")

# @api_view(['GET']) 
# def task_view(request):
#     print(request.query_params)
#     if request.query_params:
#         todo = Task.objects.filter(**request.query_params.dict())
#     if todo:
#         todotable = taskserializer(todo,many=True)
#         return Response({'data':todotable.data})
#     else:
#         return Response({'data':"no data"})


# @api_view(['GET'])
# def task_view(request, user1_id):
#     todo = Task.objects.filter(user_id=user1_id)  

#     if todo.exists():
#         todotable = taskserializer(todo, many=True)
#         return Response({'data': todotable.data})
#     else:
#         return Response({'data': "no data"})

@api_view(['GET'])
def task_view(request):
    user1_id = request.query_params.get('user1_id')
    if user1_id:
        todo = Task.objects.filter(user1_id=user1_id)
    else:
        todo = Task.objects.all()
    if todo.exists():
        todotable = taskserializer(todo, many=True)
        return Response({'data': todotable.data})
    else:
        return Response({'data': "No data found"}, status=404)


@api_view(['PUT', 'DELETE'])
def task_detail(request, task_id):
    task = Task.objects.get(id=task_id)

    if request.method == 'PUT':
        serializer = taskserializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 1, 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response({'status': 2, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        print(task,"delete")
        task.delete()
        return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def update_task_status(request, task_id):
    
    task = Task.objects.get(id=task_id)

    serializer = taskserializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # item=Task.objects.all()
    # print(item)
    # if item:
    #     serializer=taskserializer(item,many=True)
    #     return Response({"data":serializer.data})
    # else:
    #     return Response("no task added")
    
# @api_view(['GET'])
# def view_to_do(request):
#     if request.query_params:
#         todo = To_do.objects.filter(**request.query_params.dict())
#     if todo:
#         todotable = TodoSerialiser(todo,many=True)
#         return Response({'data':todotable.data})
#     else:
#         return Response({'data':"no data"})