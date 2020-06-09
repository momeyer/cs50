from rest_framework import routers
from .api import PropertyViewSet, RequestViewSet


router = routers.DefaultRouter()
router.register('api/marketplace', PropertyViewSet, 'marketplace')
router.register('api/request', RequestViewSet, 'request')

urlpatterns = router.urls 