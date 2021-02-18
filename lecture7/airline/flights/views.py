from django.shortcuts import render, reverse
from django.http import HttpResponse, Http404, HttpResponseRedirect
from .models import Flight, Passenger

# Create your views here.
def index(request):
    context = {
        "flights": Flight.objects.all()
    }
    return render(request, 'flights/index.html', context)

def flight(request, flight_id):
    try:
        flight = Flight.objects.get(pk=flight_id)
    except flight.DoesNotExiste:
        raise Http404('flight does not existe')
    context = {
        "flight" : flight,
        "passengers" : flight.passengers.all(),
        "non_passengers" : Passenger.objects.exclude(flights=flight).all()
    }

    return render(request, "flights/flight.html", context)

def book(request, flight_id):
    try:
        passenger_id = int(request.POST["passenger"])
        flight = Flight.objects.get(pk=flight_id)
        passenger = Passenger.objects.get(pk=passenger_id)
    except KeyError:
        return HttpResponse('a')
    except Flight.DoesNotExist:
        return HttpResponse('a')
    except Passenger.DoesNotExist:
        return HttpResponse('a')
    passenger.flights.add(flight)
    return HttpResponseRedirect(reverse("flight", args=(flight_id,)))