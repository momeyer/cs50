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

    def get_authenticators(self):
        return []

    def get_permissions(self):
        return [permission() for permission in self.permissions_classes]
    

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = RequestSerializer

    permission_classes_by_action = {
        'create': [permissions.AllowAny],
        'list': [permissions.IsAdminUser],
        'retrieve': [permissions.IsAdminUser],
        'update': [permissions.IsAdminUser],
        'destroy': [permissions.IsAdminUser],
    }

    def get_authenticators(self):
        return []

    def get_permissions(self):
        print("Action ", self.action)
        return [permission() for permission in self.permission_classes_by_action[self.action]]