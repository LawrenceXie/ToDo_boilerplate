from django.contrib import admin
from .models import ToDo

@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'completed')
    list_filter = ('completed', 'user')
    search_fields = ('title', 'user__username')
