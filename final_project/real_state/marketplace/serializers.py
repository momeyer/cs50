from rest_framework import serializers
from .models import Property, Request, LikedHouses

# Property Selializer

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'


class LikedHousesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedHouses
        fields = '__all__'

