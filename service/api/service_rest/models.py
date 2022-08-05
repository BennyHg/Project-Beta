from pyexpat import model
from tabnanny import verbose
from django.db import models
from django.urls import reverse

# Create your models here.

class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key =True)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["id",]
        verbose_name_plural = "statuses"


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
    # import_href= models.CharField(unique= True, max_length=50)
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
    reason = models.CharField(max_length=100) 
    technician = models.ForeignKey(
        Technician,
        related_name="services",
        on_delete=models.PROTECT,
    )
    status = models.ForeignKey(
        Status, 
        null= True,
        related_name="services", 
        on_delete=models.PROTECT,
        default= 1
        ) 

    def get_api_url(self):
        return reverse("api_detail_service", kwargs={"pk": self.pk})

    def __str__(self):
        return self.vin

    # def cancel(self):
    #     status= Status.objects.get(name="Cancel")
    #     self.status= status
    #     self.save()

    # def finish(self):
    #     status= Status.objects.get(name="Finish")
    #     self.status= status
    #     self.save()

    # @classmethod
    # def create(cls, **kwargs):
    #     kwargs["status"] = Status.objects.get(name="Scheduled")
    #     appointment = cls(**kwargs)
    #     appointment.save()
    #     return appointment    

    class Meta:
        verbose_name_plural = "Services"     