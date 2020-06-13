from django.contrib import admin
from .models import Property, Request, LikedHouses

admin.site.register(Property)
admin.site.register(Request)
admin.site.register(LikedHouses)


