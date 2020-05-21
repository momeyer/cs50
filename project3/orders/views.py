from django.shortcuts import render, reverse
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Pizza, Topping, Sub, Extra, Pasta, Salad, DinnerPlate, PizzaBaseType, Size, PizzaTopping, Order, OrderItem, User
# Create your views here.


def orderTotal(items):
    total = 0.0
    for item in items:
        if item.price != None:
            total += item.price * item.quantity

    return round(total, 2)

def generate_context(request, order, logged=False):

    context = {
          
            "bases": PizzaBaseType.objects.all(),
            "toppingOptions": PizzaTopping.objects.all(),
            "sizes": Size.objects.all(),
            "toppings": Topping.objects.all(),
            "subs": Sub.objects.all(),
            "extras": Extra.objects.all(),
            "pastas": Pasta.objects.all(),
            "salads": Salad.objects.all(),
            "sicilians": Pizza.objects.filter(base="2"),
            "regulars": Pizza.objects.filter(base="1"),
            "dinnerPlates": DinnerPlate.objects.all(),
        }

    if logged:
        user = request.user
        items = OrderItem.objects.filter(order=order)
        total = orderTotal(items)
        context["user"] = request.user
        context["order"] = Order.objects.get(user=user)
        context["items"] = OrderItem.objects.filter(order=order)
        context["totalPrice"] = total


    return context


def get_pizza(request):
    try:    
        topping = request.POST["sicilian_toppings"]
        base = 2
    except:
        topping = request.POST["regular_toppings"]
        base = 1

    toppings = {
    "Cheese": 1,
    "One topping": 2,
    "Two toppings": 3,
    "Three toppings": 4,
    "Special": 5,
    }

    return Pizza.objects.get(base=base, toppings=toppings[topping])



def get_sub_and_extras(request):
    ing = request.POST["sub"]
    print(ing)
    
    extra = request.POST["extra"]
    print("extra", extra)

    return Sub.objects.get(ingredients=ing), extra


def get_pasta(request):
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

    context = generate_context(request, order, logged=True)

    return render(request, "orders/order_view.html", context)


def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        order = if_pending_order(request)

        context = generate_context(request, order, logged=True)
        return render(request, "orders/order_view.html", context)

    else:
        
        context = generate_context(request, None, logged=False)
        return render(request, "orders/index.html", context)
        

def logout_view(request):
    logout(request)
    context = generate_context(request, None, logged=False)
    return render(request, "orders/index.html", context)


def index(request):
    
    if not request.user.is_authenticated:
        context = generate_context(request, None, logged=False)

        return render(request, "orders/index.html", context)

    order = if_pending_order(request)
    context = generate_context(request, order, logged=True)

    return render(request, "orders/order_view.html", context)


@csrf_exempt
def orderPizza(request):
    order = if_pending_order(request)
    items = OrderItem.objects.filter(order=order)
    pizza = get_pizza(request)
    toppings = request.POST.getlist('top_opt[]')
    size = request.POST["size"]
    num = int(request.POST["num"])
 
    if size == 'small':
        price = pizza.small * num
    else:
        price = pizza.large * num

    pizzaItem = OrderItem(quantity=num, order=order, content_object=pizza, object_id=pizza.id, price=price, size=Size.objects.get(size=size), extras=", ".join(toppings))
    pizzaItem.save()

    jsonResponse =  {
                    'itemName' : str(pizzaItem.content_object),
                    'itemId' : pizzaItem.id,
                    'price' : price,
                    'qnt' : num,
                    'size' : size,
                    'toppings' : ", ".join(toppings),
                    'total' : orderTotal(items)
                    }

    print(jsonResponse)

    return JsonResponse(jsonResponse, safe=False)


@csrf_exempt
def orderSub(request):
    order = if_pending_order(request)
    items = OrderItem.objects.filter(order=order)

    sub, extra = get_sub_and_extras(request)
    sub.save()

    size = request.POST["size"]
    num = int(request.POST["num"])
    print(size)

    if size == 'small':
        price = sub.small * num
    else:
        price = sub.large * num

    item = OrderItem(quantity=num, order=order, content_object=sub, object_id=sub.id, price=price, size=Size.objects.get(size=size), extras=extra)
    item.save()

    jsonResponse =  {
                    'itemName' : str(item.content_object),
                    'itemId' : item.id,
                    'price' : price,
                    'qnt' : num,
                    'size' : size,
                    'toppings' : extra,
                    'total' : orderTotal(items)
                    }

    print(jsonResponse)

    return JsonResponse(jsonResponse, safe=False)




@csrf_exempt
def orderPasta(request):
    order = if_pending_order(request)
    items = OrderItem.objects.filter(order=order)

    pasta = get_pasta(request)
    pasta.save()
    num = request.POST["num"]

    item = OrderItem(quantity=num, order=order, content_object=pasta, object_id=pasta.id, price=pasta.price)
    item.save()


    jsonResponse =  {
                    'itemName' : str(item.content_object),
                    'itemId' : item.id,
                    'price' : item.price,
                    'qnt' : item.quantity,
                    'total' : orderTotal(items)
                    }

    return JsonResponse(jsonResponse, safe=False)

@csrf_exempt
def orderSalad(request):
    order = if_pending_order(request)
    items = OrderItem.objects.filter(order=order)

    salad = if_salad(request)
    salad.save()
    num = request.POST["num"]

    item = OrderItem(quantity=num, order=order, content_object=salad, object_id=salad.id, price=salad.price)
    item.save()


    jsonResponse =  {
                    'itemName' : str(item.content_object),
                    'itemId' : item.id,
                    'price' : item.price,
                    'qnt' : item.quantity,
                    'total' : orderTotal(items)
                    }

    return JsonResponse(jsonResponse, safe=False)

@csrf_exempt
def orderDinner(request):
    order = if_pending_order(request)
    items = OrderItem.objects.filter(order=order)

    dinner = if_dinner(request)
    dinner.save()

    size = request.POST["size"]
    num = int(request.POST["num"])


    if size == 'small':
        price = dinner.small * num
    else:
        price = dinner.large * num

    item = OrderItem(quantity=num, order=order, content_object=dinner, object_id=dinner.id, price=price, size=Size.objects.get(size=size))
    item.save()

    jsonResponse =  {
                    'itemName' : str(item.content_object),
                    'itemId' : item.id,
                    'price' : price,
                    'qnt' : num,
                    'size' : size,
                    'total' : orderTotal(items)
                    }

    return JsonResponse(jsonResponse, safe=False)


@csrf_exempt
def removeItem(request):

    itemId = request.POST['itemId']
    item = OrderItem.objects.get(id=itemId)
    
    order = if_pending_order(request)
    item.delete()
    print(item)

    items = OrderItem.objects.filter(order=order)

    jsonResponse =  {
                    'total' : orderTotal(items),
                    'itemId': itemId
                    }

    return JsonResponse(jsonResponse, safe=False)



@csrf_exempt
def checkout(request):
    order = Order.objects.get(user=request.user, order_status="PENDING")

    if request.POST["street"] == "" and request.POST["city"] == "" and request.POST["state"] == "" and request.POST["zip"] == "":
        pass
    else:
        order.street = request.POST["street"]
        order.city = request.POST["city"]
        order.state = request.POST["state"]
        order.zipcode = request.POST["zip"]
        order.save()
    
    jsonResponse =  {
                    "address" : f"Address: {order.street} {order.city} {order.state} {order.zipcode}"
                    }

    return JsonResponse(jsonResponse, safe=False)
