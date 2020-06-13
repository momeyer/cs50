from rest_framework import routers
from .api import PropertyViewSet, RequestViewSet, LikedHousesViewSet


router = routers.DefaultRouter()
router.register('api/marketplace', PropertyViewSet, 'marketplace')
router.register('api/request', RequestViewSet, 'request')
router.register('api/liked', LikedHousesViewSet, 'liked')


urlpatterns = router.urls 