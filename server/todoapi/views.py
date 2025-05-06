from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def todos(request):
    """API endpoint to get all todos or add a new todo"""
    if request.method == 'GET':
        todos = Todo.objects.all().order_by('-createdAt')
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = {
            'text': request.data.get('text', ''),
            'completed': request.data.get('completed', False)
        }
        
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(f"Todo added: {serializer.data['text']}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'PATCH'])
def todo_detail(request, todo_id):
    """API endpoint to delete or update a todo item"""
    try:
        todo = Todo.objects.get(id=todo_id)
        
        if request.method == 'DELETE':
            text = todo.text
            todo.delete()
            print(f"Todo deleted: {text}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        elif request.method == 'PATCH':
            serializer = TodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print(f"Todo updated: {serializer.data['text']}, Completed: {serializer.data['completed']}")
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)