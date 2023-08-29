from django.contrib import admin
from .models import Notice

class NoticeAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_at']
    ordering = ['-created_at']

admin.site.register(Notice, NoticeAdmin)
