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

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip": count > 0}


        


@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services}, 
            encoder=ServiceEncoder,
            safe=False,
        )
    else: # POST
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
def api_detail_service(request, vin):
    if request.method == "GET":
        service = Service.objects.get(vin=vin)
        print(service)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False,
        )
        
    elif request.method == "DELETE":
        count, _ = Service.objects.filter(vin=vin).delete()
        return JsonResponse({"deleted": count > 0})

    else: # PUT
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technician.objects.get(employee_number=content["technician"])
                content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not exist "},
                status=400,
            )
        
        Service.objects.filter(vin=vin).update(**content)
        service = Service.objects.get(vin=vin)
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

@require_http_methods(["GET"])
def api_service_history(request,vin):
    if request.method == "GET":
        service = Service.objects.filter(vin=vin)
        return JsonResponse(
            {"service": service}, 
            encoder=ServiceEncoder,
            safe=False,
        )