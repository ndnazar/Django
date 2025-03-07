from django.urls import path
from DealMover.views.products import ProductListView
from DealMover.views.index import react_app_view
from DealMover.views.index import closed_view
from DealMover.views.index import home_view
urlpatterns = [
    path('', react_app_view, name='react_app'),
    path('', home_view, name='home'),
    path('home/', home_view, name='new_page'),
    path('closed/', closed_view, name='closed'),
    path('products', ProductListView.as_view(), name='products'),
]