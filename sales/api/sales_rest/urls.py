from django.urls import path
from .views import (
    api_sales_records,
    api_sales_record,
    api_customers,
    api_customer,
    api_sales_persons,
    api_sales_person,
)

urlpatterns = [
    path("sales_records/", api_sales_records, name="api_sales_records"),
    path("sales_records/<int:pk>/", api_sales_record, name="api_sales_record"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("sales_persons/", api_sales_persons, name="api_sales_persons"),
    path("sales_persons/<int:pk>/", api_sales_person, name="api_sales_person")
]