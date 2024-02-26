import django
django.setup()
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import Product, Review
from django.contrib.auth.models import User

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create_user(username='testuser', password='testpassword')

@pytest.mark.django_db
def test_get_products(api_client):
    Product.objects.create(name='Product 1', price=10.00)
    Product.objects.create(name='Product 2', price=15.00)
    url = reverse('products')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_get_top_products(api_client):
    Product.objects.create(name='Product 1', price=10.00, rating=4.5)
    Product.objects.create(name='Product 2', price=15.00, rating=4.2)
    url = reverse('top-products')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_get_product(api_client):
    product = Product.objects.create(name='Test Product', price=20.00)
    url = reverse('product', kwargs={'pk': product.pk})
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_create_product_review(api_client, user):
    product = Product.objects.create(name='Test Product', price=20.00)
    url = reverse('create-review', kwargs={'pk': product.pk})
    data = {
        'rating': 5,
        'comment': 'Great product!'
    }
    api_client.force_authenticate(user=user)
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
