from django.db import models

# Create your models here.
class Property(models.Model):
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=16)
    offer_type = models.CharField(max_length=16)
    bedroom = models.PositiveIntegerField(default=1)
    bathroom = models.PositiveIntegerField(default=1)
    year = models.PositiveIntegerField(default=2000)
    size = models.PositiveIntegerField(default=40)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Location: {self.address} - {self.city} Type: {self.property_type} ({self.offer_type}) ({self.bedroom} beds, {self.bathroom} baths, {self.size} m2, construction year: {self.year}) ${self.price} Posted: {self.created_at}"

class Request(models.Model):
    house_id = models.PositiveIntegerField()
    email = models.EmailField()
    name = models.CharField(max_length=100)
    request = models.TextField()
    time = models.DateTimeField(auto_now_add=True)