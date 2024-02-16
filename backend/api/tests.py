from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from api.models import Product, Review
from api.views import GetProducts, GetTopProducts, GetProduct, CreateProductReview

class ProductTestCase(TestCase):
    def setUp(self):
        # Create a user for authentication
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Create products for testing
        self.product1 = Product.objects.create(name='Product 1', price=10, rating=4)
        self.product2 = Product.objects.create(name='Product 2', price=20, rating=5)
        
    def test_get_products(self):
        # Test GetProducts view
        factory = APIRequestFactory()
        request = factory.get('/api/products/')
        response = GetProducts(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['products']), 2)

    def test_get_top_products(self):
        # Test GetTopProducts view
        factory = APIRequestFactory()
        request = factory.get('/api/top-products/')
        response = GetTopProducts(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_get_product(self):
        # Test GetProduct view
        factory = APIRequestFactory()
        request = factory.get('/api/product/1/')
        response = GetProduct(request, pk=1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Product 1')

    def test_create_product_review(self):
        # Test CreateProductReview view
        factory = APIRequestFactory()
        request = factory.post('/api/product/1/reviews/', {'rating': 4, 'comment': 'Great product'})
        force_authenticate(request, user=self.user)
        response = CreateProductReview(request, pk=1)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, 'Review Added')

        # Check if the review and product attributes are updated
        product = Product.objects.get(pk=1)
        reviews = Review.objects.filter(product=product)
        self.assertEqual(reviews.count(), 1)
        self.assertEqual(product.numReviews, 1)
        self.assertEqual(product.rating, 4.0)

        # Test case where the product is already reviewed
        request = factory.post('/api/product/1/reviews/', {'rating': 5, 'comment': 'Awesome product'})
        force_authenticate(request, user=self.user)
        response = CreateProductReview(request, pk=1)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['detail'], 'Product already reviewed')

        # Test case where rating is 0
        request = factory.post('/api/product/2/reviews/', {'rating': 0, 'comment': 'Invalid rating'})
        force_authenticate(request, user=self.user)
        response = CreateProductReview(request, pk=2)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['detail'], 'Please Select a rating')
