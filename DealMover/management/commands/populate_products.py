from faker import Faker
import random

from django.core.management.base import BaseCommand
from DealMover.models import Product

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        faker = Faker()

        categories = [
            'Electronics',
            'Books',
            'Clothing',
            'Home & Garden',
            'Toys & Games',
            'Sports & Outdoors',
            'Health & Beauty',
            'Automotive',
            'Groceries',
            'Pet Supplies'
        ]

        for _ in range(1000):
            Product.objects.create(
                name=faker.text(max_nb_chars=20).capitalize(),
                description=faker.text(),
                category=random.choice(categories),
                price=round(random.uniform(5.0, 500.0), 2),
                stock_quantity=random.randint(0, 100),
                rating=round(random.uniform(1.0, 5.0), 1)
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with products.'))