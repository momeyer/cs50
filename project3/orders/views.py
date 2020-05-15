from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, reverse
from .models import Pizza, Topping, Sub, Extra, Pasta, Salad, DinnerPlate, PizzaBaseType, Size, PizzaTopping, Order, OrderItem, User
# Create your views here.

def generate_context(request, order):
    user = request.user
    context = {
            "user": request.user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "pizzas": Pizza.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
            "order": Order.objects.get(user=user),
            "items": OrderItem.objects.filter(order=order)
        }

    return context

def if_regular_pizza(request):
    topping = int(request.POST["regular_toppings"])
    size = int(request.POST["size"])

    return Pizza.objects.get(base=1, toppings=topping, size=size)


def if_sicilian_pizza(request):
    topping = int(request.POST["sicilian_toppings"])
    size = int(request.POST["size"])

    return Pizza.objects.get(base=2, toppings=topping, size=size)


def if_sub(request):
    ing = request.POST["sub"]
    size = int(request.POST["size"])

    return Sub.objects.get(ingredients=ing, size=size)

def if_pasta(request):
    pasta = request.POST["pasta"]

    return Pasta.objects.get(ingredients=pasta)

def if_salad(request):
    salad = request.POST["salad"]

    return Salad.objects.get(ingredients=salad)

def if_dinner(request):
    dinner = request.POST["dinner"]
    size = int(request.POST["size"])

    return DinnerPlate.objects.get(ingredients=dinner, size=size)


def if_pending_order(request):
    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()
    return order


def register(request):
    print('hello')
    username = request.POST["username"]
    password = request.POST["password"]
    fname = request.POST["fname"]
    lname = request.POST["lname"]
    email = request.POST["email"]
    address = request.POST["address"]
    city = request.POST["city"]
    zipCode = request.POST["zipCode"]
    state = request.POST["state"]

    user = User.objects.create_user(username, email, password)
    user.save()

    order = Order.objects.create(user=user, order_status='PENDING')
    order.save()

    context = {
            "user": user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "pizzas": Pizza.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
            "order": Order.objects.get(user=user),
            "items": OrderItem.objects.filter(order=order)
        }

    return render(request, "orders/order_view.html", context)

def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        order = if_pending_order(request)
        
        context = generate_context(request, order)

        return render(request, "orders/order_view.html", context)
    else:
        context = {
            "user": user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "pizzas": Pizza.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
        }
        return render(request, "orders/index.html")


def logout_view(request):
    logout(request)
    return HttpResponse("bye")


def index(request):
    if not request.user.is_authenticated:
        context = {
            "user": request.user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "pizzas": Pizza.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
        }
        return render(request, "orders/index.html", context)

    order = if_pending_order(request)
    context = generate_context(request, order)

    return render(request, "orders/order_view.html", context)


def orderPizza(request):
    order = if_pending_order(request)
    try:
        pizza = if_sicilian_pizza(request)

    except:
        pizza = if_regular_pizza(request)

    num = int(request.POST["num"])
    for i in range(num):
        item = OrderItem(order=order, content_object=pizza, object_id=pizza.id)
        item.save()

    # for topping in toppings:
    #     t = Topping.objects.get(name=topping)
    #     item = OrderItem(order=order, content_object=t, object_id=t.id)
    #     item.save()

    context = generate_context(request, order)

    return render(request, "orders/order_view.html", context)


def orderSub(request):
    order = if_pending_order(request)

    sub = if_sub(request)
    sub.save()

    item = OrderItem(order=order, content_object=sub, object_id=sub.id)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderPasta(request):
    order = if_pending_order(request)

    pasta = if_pasta(request)
    pasta.save()

    item = OrderItem(order=order, content_object=pasta, object_id=pasta.id)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderSalad(request):
    order = if_pending_order(request)

    salad = if_salad(request)
    salad.save()

    item = OrderItem(order=order, content_object=salad, object_id=salad.id)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderDinner(request):
    order = if_pending_order(request)

    dinner = if_dinner(request)
    dinner.save()

    item = OrderItem(order=order, content_object=dinner, object_id=dinner.id)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)