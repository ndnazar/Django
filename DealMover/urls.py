
from django.urls import path
from DealMover.views.index import home_view, index_view
from DealMover.views.products import ProductListView
from DealMover.views.index import react_app_view
urlpatterns = [
    path('', react_app_view, name='react_app'),
    path('', home_view, name='home'),
    path('home/', home_view, name='new_page'),
    path('products', ProductListView.as_view(), name='products'),
    path('index/', index_view, name='index'),
]