from DealMover.views.products import ProductListView
from DealMover.views.index import react_app_view
from DealMover.views.index import closed_view
from DealMover.views.index import home_view
from DealMover.views.index import borrower_summary
from DealMover.views.index import quarterly_review
from DealMover.views.index import exposure
from DealMover.views.index import revenue_and_returns
from DealMover.views.index import financial_summary
from DealMover.views.index import borrower_data_room
from DealMover.views.index import transactions
from DealMover.views.index import newproject_view
from DealMover.views.index import financial_performance
from DealMover.views.index import management_team
from DealMover.views.index import transaction_overview
from DealMover.views.index import summary_terms
from DealMover.views.index import products_and_services
from DealMover.views.index import customers
from DealMover.views.index import data_room
from DealMover.views.index import industry
from DealMover.views.index import pb_data
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from DealMover.views.index import upload_file
from DealMover.views.index import ProjectCreateView

urlpatterns = [
    path('', react_app_view, name='react_app'),
    path('home/', home_view, name='home'),
    path('borrower_summary/', borrower_summary, name='borrower_summary'),
    path('borrower_data_room/', borrower_data_room, name='borrower_data_room'),
    path('exposure/', exposure, name='exposure'),
    path('financial_summary/', financial_summary, name='financial_summary'),
    path('quarterly_review/', quarterly_review, name='quarterly_review'),
    path('revenue_and_returns/', revenue_and_returns, name='revenue_and_returns'),
    path('transactions/', transactions, name='transactions'),
    path('new/', newproject_view, name='new_project'),
    path('financial_performance_new/', financial_performance, name='financial_performance_new'),
    path('management_team/', management_team, name='management_team'),
    path('transaction_overview/', transaction_overview, name='transaction_overview'),
    path('summary_terms/', summary_terms, name='summary_terms'),
    path('products_and_services/', products_and_services, name='products_and_services'),
    path('customers/', customers, name='customers'),
    path('industry/', industry, name='industry'),
    path('data_room/', data_room, name='data_room'),
    path('closed/', closed_view, name='closed'),
    path('products', ProductListView.as_view(), name='products'),
    path('pb_data', pb_data, name='pb_data'),
    path('api/projects/', ProjectCreateView.as_view(), name='create_project'),
    path('upload/', upload_file, name='upload_file'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)