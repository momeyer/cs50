from django.db import models

# Create your models here.
class Property(models.Model):
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=16)
    offer_type = models.CharField(max_length=16)
    price = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


