from django.db import models
from django.core.exceptions import ValidationError


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField()
    rating = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UploadedFile(models.Model):
    objects = None
    name = models.CharField(max_length=255)
    url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Project(models.Model):
    projectId = models.IntegerField(primary_key=True, null=False, blank=True)
    industry = models.CharField(max_length=255)
    transaction_type = models.CharField(max_length=255)
    deal_stage = models.CharField(max_length=255)
    projected_close_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'dealmover_projects'

    def __str__(self):
        return self.project_name

    def clean(self):
        if not isinstance(self.projectId, int):
            raise ValidationError("projectId must be a number.")