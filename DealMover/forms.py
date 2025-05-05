from django import forms
from .models import DealVault

class DealVaultForm(forms.ModelForm):
    class Meta:
        model = DealVault
        fields = ['Project_Name', 'Company_Name', 'Transaction_Type', 'Products_Services']