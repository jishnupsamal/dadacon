from django.contrib import admin
# from .models import User
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserCreationForm, UserChangeForm

User = get_user_model()
admin.site.unregister(Group)

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined", "token")}),
    )
    list_filter = ()
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()
    list_display = ['id', 'email', 'username', 'is_active', 'date_joined']

class GroupAdmin(admin.ModelAdmin):
    list_display=['id', 'name']
    
    
admin.site.register(User, UserAdmin)
admin.site.register(Group, GroupAdmin)
