from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.db import models
from enum import Enum

# Create your models here.
class PizzaBaseType(models.Model):
    base = models.CharField(max_length=20)
 
    def __str__(self):
        return f'{self.base}'

class PizzaTopping(models.Model):
    topping = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.topping}'

class Size(models.Model):
    size = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.size}'

class Pizza(models.Model):
    base = models.ForeignKey(PizzaBaseType, on_delete=models.CASCADE, null=True)
    toppings = models.ForeignKey(PizzaTopping, on_delete=models.CASCADE, null=True)
    size = models.ForeignKey(Size,on_delete=models.CASCADE, null=True)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"""{self.base} pizza {self.toppings} {self.size} US$ {self.price}"""

class Topping(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name}"


class Sub(models.Model):
    ingredients = models.CharField(max_length=64)
    size = models.ForeignKey(Size,on_delete=models.CASCADE, null=True)
    price = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"{self.ingredients} {self.size}"


class Extra(models.Model):
    extra = models.CharField(max_length=20)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.extra} US$ {self.price}"


class Pasta(models.Model):
    ingredients = models.CharField(max_length=64)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.ingredients}"


class Salad(models.Model):
    ingredients = models.CharField(max_length=64)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.ingredients}"


class DinnerPlate(models.Model):
    ingredients = models.CharField(max_length=64)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True)
    price = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.ingredients} {self.size}"


class Order(models.Model):
    PENDING = 'PENDING'
    DONE = 'DONE'
  
    ORDER_STATUS_CHOICES = [
        (PENDING, 'pending'),
        (DONE, 'done'),
    ]
    user =  models.ForeignKey(User, on_delete=models.CASCADE)
    order_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f"""user: {self.user}   \norder: {self.id}\n    status: {self.order_status}"""


class OrderItem(models.Model):

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"item: {self.content_object}"

