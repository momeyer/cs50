from .models import Property, Request
from rest_framework import viewsets, permissions
from .serializers import PropertySerializer, RequestSerializer


# Property Viewset
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = PropertySerializer
    

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    permissions_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RequestSerializer