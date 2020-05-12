from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("order/", views.order, name="order"),
    path("orderPasta/", views.orderPasta, name="orderPasta"),
    path("orderSub/", views.orderSub, name="orderSub"),
    path("ordeSalad/", views.orderSalad, name="orderSalad"),
    path("ordeDinner/", views.orderDinner, name="orderDinner"),
    path("register/", views.register, name="register")
]
