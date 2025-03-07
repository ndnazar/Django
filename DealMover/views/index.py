from django.shortcuts import render

def react_app_view(request):
    return render(request, "home.html")
def home_view(request):
    return render(request, "home.html")

def closed_view(request):
    return render(request, 'closed.html')