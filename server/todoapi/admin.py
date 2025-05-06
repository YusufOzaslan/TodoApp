from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('text', 'completed', 'createdAt')
    list_filter = ('completed', 'createdAt')
    search_fields = ('text',)
    readonly_fields = ('id', 'createdAt')
