from django.contrib import admin

from .models import AutomobileVO, SalesPerson, Customer, SalesRecord

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesPerson)
class SalesPersonAdmin(admin.ModelAdmin):
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecordAdmin(admin.ModelAdmin):
    pass
