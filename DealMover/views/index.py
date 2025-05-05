from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from DealMover.models import Project
from DealMover.serializers import ProjectSerializer

class ProjectCreateView(APIView):
    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        file_name = default_storage.save(file.name, file)
        file_url = f'/media/{file_name}'

        UploadedFile.objects.create(name=file.name, url=file_url)

        return JsonResponse({'message': 'File uploaded successfully', 'file_url': file_url}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def react_app_view(request):
    return render(request, "home.html")


def home_view(request):
    return render(request, "home.html")


def closed_view(request):
    return render(request, 'closed.html')


def borrower_summary(request):
    return render(request, 'Borrower Templates/borrower_summary.html')


def quarterly_review(request):
    return render(request, 'Borrower Templates/quarterly_review.html')


def exposure(request):
    return render(request, 'Borrower Templates/exposure.html')


def financial_summary(request):
    return render(request, 'Borrower Templates/financial_performance.html')


def revenue_and_returns(request):
    return render(request, 'Borrower Templates/borrower_summary.html')


def borrower_data_room(request):
    return render(request, 'Borrower Templates/borrower_data_room.html')


def transactions(request):
    return render(request, 'Borrower Templates/transactions.html')


def newproject_view(request):
    return render(request, 'new_project.html')


def transaction_overview(request):
    return render(request, 'transaction_overview.html')


def summary_terms(request):
    return render(request, 'summary_terms.html')


def financial_performance(request):
    return render(request, 'financial_performance_new.html')


def management_team(request):
    return render(request, 'management_team.html')


def products_and_services(request):
    return render(request, 'products_and_services.html')


def customers(request):
    return render(request, 'customers.html')


def industry(request):
    return render(request, 'industry.html')


def data_room(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        files = list(UploadedFile.objects.values('id', 'name', 'url'))
        return JsonResponse({'files': files})
    return render(request, 'data_room.html', {'files': UploadedFile.objects.all()})


def pb_data(request):
    return render(request, 'pb_data.html')
