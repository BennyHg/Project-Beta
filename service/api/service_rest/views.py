from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from service_rest.models import AutomobileVO, Service, Technician

# Create your views here.

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        # "id",
        "name",
        "employee_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "model",
    ]

class ServiceEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services}, 
            encoder=ServiceEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_number=content["technician"])
            content["technician"] = technician
        
            
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )
        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_detail_service(request, pk):
    if request.method == "GET":
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )
        
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "vin" in content:
                vin = AutomobileVO.objects.get(id=content["vin"])
                content["vin"] = vin
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status=400,
            )
        
        Service.objects.filter(id=pk).update(**content)
        shoe = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians}, 
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            name = content["name"]
            employee_number = content["employee_number"]

            
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid id"},
                status=400,
            )
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
