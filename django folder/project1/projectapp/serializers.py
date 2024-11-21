from rest_framework import serializers
from .models import User,Task

class registerserializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields =("id","first_name","last_name","username","password","phone_number","gender","email")


class taskserializer(serializers.ModelSerializer): 
    class Meta: 
        model = Task 
        fields =("id","user1","task_name","task_description","status")
