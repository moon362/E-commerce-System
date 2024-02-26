# Import necessary modules
import django
django.setup()
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import UserSerializerWithToken
# Import views from user_views.py
from api.views import user_views as views
# Define test cases for user views
class UserViewsTestCase(APITestCase):
    def setUp(self):
        # Create a test user
        self.test_user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )

        # Obtain token for the test user
        token = RefreshToken.for_user(self.test_user)
        self.access_token = str(token.access_token)

    # def test_get_routes(self):
    #     # Test GET request to get API routes
    #     url = reverse('get-routes')
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_register_user(self):
    #     # Test POST request to register a new user
    #     url = reverse('register-user')
    #     data = {
    #         'name': 'New User',
    #         'email': 'newuser@example.com',
    #         'password': 'newpassword'
    #     }
    #     response = self.client.post(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    def test_get_user_profile(self):
        # Test GET request to get user profile
        url = reverse('get-user-profile')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_profile(self):
        # Test PUT request to update user profile
        url = reverse('update-user-profile')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        data = {
            'name': 'Updated Name',
            'email': 'updated@example.com',
            'password': 'newpassword'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        # Test DELETE request to delete a user
        user_to_delete = User.objects.create_user(
            username='deleteuser',
            email='delete@example.com',
            password='deletepassword'
        )
        url = reverse('delete-user', args=[user_to_delete.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
