import django
django.setup()
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User
from api.models import Order, Product

class OrderViewTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    # def test_add_order_items(self):
    #     url = reverse('orders_add')  # Update to match the name in your urls.py
    #     data = {
    #         'orderItems': [
    #             {
    #                 '_id': 'some_product_id',
    #                 'qty': 2,
    #                 'price': 20.00,
    #             },
    #         ],
    #         'paymentMethod': 'some_payment_method',
    #         'taxPrice': 5.00,
    #         'shippingPrice': 10.00,
    #         'totalPrice': 35.00,
    #         'shippingAddress': {
    #             'address': '123 Main St',
    #             'city': 'City',
    #             'postalCode': '12345',
    #             'country': 'Country',
    #         }
    #     }

    # # Create the Order instance with the necessary fields
    #     order = Order.objects.create(user=self.user, payment_method='some_payment_method', tax_price=5.0, shipping_price=10.0, total_price=35.0)

    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    # # Add additional assertions based on your application logic

    def test_get_my_orders(self):
        url = reverse('my_orders')  # Update to match the name in your urls.py

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add additional assertions based on your application logic

    def test_get_order_by_id(self):
        order = Order.objects.create(user=self.user)
        url = reverse('user_order', kwargs={'pk': order.pk})  # Update to match the name in your urls.py

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add additional assertions based on your application logic

    def test_update_order_to_paid(self):
        order = Order.objects.create(user=self.user)
        url = reverse('pay', kwargs={'pk': order.pk})  # Update to match the name in your urls.py

        response = self.client.put(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Add additional assertions based on your application logic