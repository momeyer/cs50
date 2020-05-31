from rest_framework import routers
from .api import PropertyViewSet


router = routers.DefaultRouter()
router.register('api/marketplace', PropertyViewSet, 'marketplace')

urlpatterns = router.urls 