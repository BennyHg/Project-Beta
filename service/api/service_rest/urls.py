from django.urls import path

from .views import (
    api_list_services, api_detail_service,api_list_technician
)

urlpatterns = [
    path("services/", api_list_services, name="api_list_services"),
    path(
        "services/<int:pk>/", api_detail_service, name="api_detail_service",
    ),
    path("technician/", api_list_technician, name="api_list_technician"),
]
