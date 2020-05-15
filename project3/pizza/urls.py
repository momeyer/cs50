"""pizza URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("", include("orders.urls")),
    path("register/", include("orders.urls")),
    path("login/", include("orders.urls")),
    path("logout/", include("orders.urls")),
    path("Pizza/", include("orders.urls")),
    path("Sub/", include("orders.urls")),
    path("Pasta/", include("orders.urls")),
    path("Dinner/", include("orders.urls")),
    path("Salad/", include("orders.urls")),
    path("admin/", admin.site.urls),
]