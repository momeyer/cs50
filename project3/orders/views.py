from django.shortcuts import render, reverse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from .models import Pizza, Topping, Sub, Extra, Pasta, Salad, DinnerPlate, PizzaBaseType, Size, PizzaTopping, Order, OrderItem, User
# Create your views here.


def orderTotal(items):
    total = 0.0
    for item in items:
        if item.price != None:
            total += item.price

    return round(total, 2)


def generate_context(request, order):
    user = request.user
    items = OrderItem.objects.filter(order=order)

    total = orderTotal(items)

    context = {
            "user": request.user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
            "order": Order.objects.get(user=user),
            "items": OrderItem.objects.filter(order=order),
            "totalPrice": total
        }

    return context  

def if_regular_pizza(request):
    topping = request.POST["regular_toppings"]
    

    print(topping)

    toppings = {
    "cheese" : 1,
    "one topping" : 2,
    "two toppings" : 3,
    "three toppings": 4,
    "special" : 5,
    }

    print(Pizza.objects.get(base=1, toppings=toppings[topping]))
    
    return Pizza.objects.get(base=1, toppings=toppings[topping])


def if_sicilian_pizza(request):
    topping = request.POST["sicilian_toppings"]

    print('sicilian')

    toppings = {
    "cheese" : 1,
    "one topping" : 2,
    "two toppings" : 3,
    "three toppings": 4,
    "special" : 5,
    }

    print(Pizza.objects.get(base=2, toppings=toppings[topping]))

    return Pizza.objects.get(base=2, toppings=toppings[topping])


def if_sub(request):
    ing = request.POST["sub"]
    
    return Sub.objects.get(ingredients=ing)

def if_pasta(request):
    pasta = request.POST["pasta"]

    return Pasta.objects.get(ingredients=pasta)

def if_salad(request):
    salad = request.POST["salad"]

    return Salad.objects.get(ingredients=salad)

def if_dinner(request):
    dinner = request.POST["dinner"]

    return DinnerPlate.objects.get(ingredients=dinner)


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
    context = {
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "toppings": Topping.objects.all(),
            "regulars" : Pizza.objects.filter(base=1),
            "sicilians" : Pizza.objects.filter(base=2),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "dinnerPlates": DinnerPlate.objects.all(),
        }
    return render(request, "orders/index.html", context)


def index(request):
    if not request.user.is_authenticated:
        context = {
            "user": request.user,
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "regulars" : Pizza.objects.filter(base=1),
            "sicilians" : Pizza.objects.filter(base=2),
            "sizes": Size.objects.all(),
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
    print("Order pizza")

    order = if_pending_order(request)
    try:
        pizza = if_sicilian_pizza(request)

    except:
        pizza = if_regular_pizza(request)

    
    size = request.POST["size"]

    if size == 'small':
        price = pizza.small
    else:
        price = pizza.large

    num = int(request.POST["num"])

    for i in range(num):
        item = OrderItem(order=order, content_object=pizza, object_id=pizza.id, price=price)
        item.save()

    toppings = request.POST.getlist('top_opt')

    for topping in toppings:
        t = Topping.objects.get(name=topping)
        item = OrderItem(order=order, content_object=t, object_id=t.id)
        item.save()

    context = generate_context(request, order)

    print(context["items"].values())

    # return render(request, "orders/order_view.html", context)
    return JsonResponse(list(context["items"].values()), safe=False)


def orderSub(request):
    order = if_pending_order(request)

    sub = if_sub(request)
    sub.save()

    size = request.POST["size"]

    if size == 'small':
        price = sub.small
    else:
        price = sub.large


    item = OrderItem(order=order, content_object=sub, object_id=sub.id, price=price)
    item.save()

    try:
        extra = request.POST["extra"]
        print("extra", extra)
        ex = Extra.objects.get(id=extra)
        print("ex", ex)
        item = OrderItem(order=order, content_object=ex, object_id=ex.id, price=ex.price)
        print(item)
        item.save()

    except:
        pass

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderPasta(request):
    order = if_pending_order(request)

    pasta = if_pasta(request)
    pasta.save()

    item = OrderItem(order=order, content_object=pasta, object_id=pasta.id, price=pasta.price)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderSalad(request):
    print('salad')
    order = if_pending_order(request)

    salad = if_salad(request)
    salad.save()

    item = OrderItem(order=order, content_object=salad, object_id=salad.id, price=salad.price)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)

def orderDinner(request):
    order = if_pending_order(request)

    dinner = if_dinner(request)
    dinner.save()

    size = request.POST["size"]

    if size == 'small':
        price = dinner.small
    else:
        price = dinner.large

    item = OrderItem(order=order, content_object=dinner, object_id=dinner.id, price=price)
    item.save()

    context = generate_context(request, order)
    return render(request, "orders/order_view.html", context)
