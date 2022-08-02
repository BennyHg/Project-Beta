from django.contrib import admin
from .models import Service,AutomobileVO

# Register your models here.
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass