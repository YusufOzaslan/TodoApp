from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.todos, name='todos'),
    path('todos/<uuid:todo_id>/', views.todo_detail, name='todo_detail'),
] 