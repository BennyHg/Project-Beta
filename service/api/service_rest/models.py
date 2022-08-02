from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    name =  models.CharField( unique=True,max_length=100)
    employee_number = models.IntegerField(unique=True, null=True)

    def get_api_url(self):
        return reverse("api_list_technician", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

class AutomobileVO(models.Model):
    vin = models.CharField(unique=True,max_length=100)
    color = models.CharField(null= True,max_length=100)
    year = models.IntegerField(null=True)
    model = models.CharField(null= True,max_length=100)
    # import_href= models.CharField(unique= True, max_length=200)
    # vip = models.BooleanField (default=True)

    def get_api_url(self):
        return reverse("api_automobiles", kwargs={"vin": self.vin})

    def __str__(self):
        return f"{self.model}{self.vin}{self.year}"
        

class Service(models.Model):
    vin = models.CharField(unique=True,max_length=100)
    customer_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)  
    time = models.DateTimeField(auto_now_add=True) 
    reason = models.CharField(max_length=200) 
    technician = models.ForeignKey(
        Technician,
        related_name="services",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_detail_service", kwargs={"pk": self.pk})

    def __str__(self):
        return self.vin

 