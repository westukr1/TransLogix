from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from models import User  # Імпортуйте вашу модель User
from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticationTests(APITestCase):

    def setUp(self):
        # Створюємо тестового користувача
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_login(self):
        # Тестуємо логування користувача і отримання JWT токену
        url = reverse('custom_login')  # Шлях до логін ендпоінта
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
