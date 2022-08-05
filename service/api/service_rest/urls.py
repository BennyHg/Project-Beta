from django.urls import path

from .views import (
    api_list_services, api_detail_service,api_list_technician,api_service_history, 
    api_cancel_appointment, api_finish_appointment,api_change_status,
)

urlpatterns = [
    path("services/", api_list_services, name="api_list_services"),
    path("services/<str:vin>/", api_detail_service, name="api_detail_service"),
    path("technician/", api_list_technician, name="api_list_technician"),
    path("services/<str:vin>/", api_service_history, name="api_service_history"),
    # path("services/<str:vin>/cancel", api_cancel_appointment, name="api_cancel_appointment"),
    # path("services/<str:vin>/finish", api_finish_appointment, name="api_finish_appointment"),
    path("services/<str:vin>/status/", api_change_status, name="api_change_status"),

]
