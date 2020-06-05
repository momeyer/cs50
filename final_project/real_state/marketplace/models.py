from django.db import models

# Create your models here.
class Property(models.Model):
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=16)
    offer_type = models.CharField(max_length=16)
    bedroom = models.PositiveIntegerField(default=1)
    bathroom = models.PositiveIntegerField(default=1)
    size = models.PositiveIntegerField(default=40)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Location: {address} - {city} Type: {property_type} ({offer_type}) ({bedroom} beds, {bathroom}baths, {size}m2) ${price} Posted: {created_at}"
       