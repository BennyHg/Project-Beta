from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})

class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=12)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})

class SalesRecord(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_records",
        on_delete=models.PROTECT
    )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_records",
        on_delete=models.PROTECT
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales_records",
        on_delete=models.PROTECT
    )

    price = models.CharField(max_length=10)

    def get_api_url(self):
        return reverse("api_sales_record", kwargs={"pk": self.id})
