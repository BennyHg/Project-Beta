from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from decimal import Decimal


from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "id",
    ]

class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

class SalesRecordPriceEncoder(DecimalEncoder):
    model = SalesRecord
    properties = ["price"]

class SalesRecordListEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "sales_person",
        "customer",
        "automobile",
        "price",
        "id",
    ]
    encoders = {
        "sales_person": SalesPersonListEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVOEncoder(),
        "price": SalesRecordPriceEncoder(),
    }

    # def get_extra_data(self, o):
    #     return {
    #         "vin": o.automobile.vin,
    #         "customer": o.customer.name,
    #         "sales_person": o.sales_person.name,
    #         "employee_number": o.sales_person.employee_number,
    #     }


# Customer
@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not create customer"}, 
                status=400
                )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["name", "address", "phone_number"]
            for prop in props:
                setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerListEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            ) 

# Sales Person
@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not create sales person"}, 
                status=400
                )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_sales_person(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Sales person does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"}
            )
    else:
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )

# Sales Record
@require_http_methods(["GET", "POST"])
def api_sales_records(request):
    if request.method == "GET":
        salesrecords = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecords": salesrecords},
            encoder=SalesRecordListEncoder
        )
    else: # post 
        try:
            content = json.loads(request.body)

            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile

            sales_person_name = content["sales_person"]
            sales_person = SalesPerson.objects.get(name=sales_person_name)
            content["sales_person"] = sales_person

            customer_name = content["customer"]
            customer = Customer.objects.get(name=customer_name)
            content["customer"] = customer

            salesrecord = SalesRecord.objects.create(**content)
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordListEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not create Sales record"},
                status=400,
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sales_record(request, pk):
    if request.method == "GET":
        try:
            salesrecord = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordListEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            count, _ = SalesRecord.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            salesrecord = SalesRecord.objects.get(id=pk)

            props = ["price"]
            for prop in props:
                if prop in content:
                    setattr(salesrecord, prop, content[prop])
            salesrecord.save()
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordListEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )