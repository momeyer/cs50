from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, reverse
from .models import Pizza, Topping, Sub, Extra, Pasta, Salad, DinnerPlate, PizzaBaseType, Size, PizzaTopping, Order, OrderItem, User
# Create your views here.


def register(request):
    username = request.POST["username"]
    password = request.POST["password"]
    email = request.POST["email"]
    user = User.objects.create_user(username, email, password)
    user.save()
    print(user)

    return HttpResponseRedirect(reverse("index"))
    

def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)

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

        return render(request, "orders/index.html", context)
    else:
        return render(request, "orders/index.html", {"message": "Invalid credentials."})


def logout_view(request):
    logout(request)

    return render(request, "orders/index.html", {"message": "Logged out."})


def index(request):
    if not request.user.is_authenticated:
          return render(request, "orders/index.html", {"message": None})

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


def order(request):
    base = int(request.POST["base"])
    topping = int(request.POST["topping"])
    size = int(request.POST["size"])
    toppings = request.POST.getlist('checks')
    pizza = Pizza.objects.get(base=base, toppings=topping, size=size)

    print(Pizza.objects.get(base=base, toppings=topping, size=size))
    

    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()
    
    item = OrderItem(order=order, content_object=pizza, object_id=pizza.id)
    item.save()

    for topping in toppings:
        t = Topping.objects.get(name=topping)
        item = OrderItem(order=order, content_object=t, object_id=t.id)
        item.save()

    context = {
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
        "order": Order.objects.get(user=request.user, order_status='PENDING'),
        "items": OrderItem.objects.filter(order=order)
    }
    return render(request, "orders/index.html", context)

def orderPasta(request):
    selected =  request.POST.getlist('checks')
    
    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()

    for pasta in selected:
        pasta = Pasta.objects.get(ingredients=pasta)      
        item = OrderItem(order=order, content_object=pasta, object_id=pasta.id)
        item.save()

    context = {
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
        "order": Order.objects.get(user=request.user,),
        "items": OrderItem.objects.filter(order=order)
    }
    return render(request, "orders/index.html", context)


def orderSub(request):
    selected =  request.POST.getlist('checks')
    size = int(request.POST["subsize"])

    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()

    for sub in selected:
        sub = Sub.objects.get(ingredients=sub, size=size)
        item = OrderItem(order=order, content_object=sub, object_id=sub.id)
        item.save()
        print(sub, size)

    context = {
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
        "order": Order.objects.get(user=request.user,),
        "items": OrderItem.objects.filter(order=order)
    }
    return render(request, "orders/index.html", context)


def orderDinner(request):
    selected =  request.POST.getlist('checks')
    size = int(request.POST["platesize"])

    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()

    for plate in selected:
        plate = DinnerPlate.objects.get(ingredients=plate, size=size)
        item = OrderItem(order=order, content_object=plate, object_id=plate.id)
        item.save()
        print(plate, size)

    context = {
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
        "order": Order.objects.get(user=request.user,),
        "items": OrderItem.objects.filter(order=order)
    }
    return render(request, "orders/index.html", context)



def orderSalad(request):
    selected =  request.POST.getlist('checks')

    try:
        order = Order.objects.get(user=request.user, order_status='PENDING')
    except:
        order = Order.objects.create(user=request.user, order_status='PENDING')
        order.save()

    for salad in selected:
        salad = Salad.objects.get(ingredients=salad)
        item = OrderItem(order=order, content_object=salad, object_id=salad.id)
        item.save()
        
    context = {
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
        "order": Order.objects.get(user=request.user,),
        "items": OrderItem.objects.filter(order=order)
    }
    return render(request, "orders/index.html", context)