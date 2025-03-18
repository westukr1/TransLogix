from django.contrib.auth.hashers import check_password
from rest_framework import status, viewsets, generics
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Route, Passenger, CoordinatePoint, Country, Region, District, City, Street, PassengerRoute, \
    House, Driver, Vehicle, DriverVehicleAssignment, FuelType, PassengerTripRequest
from .serializers import (
    UserSerializer, RouteSerializer, CoordinatePointSerializer, DistrictSerializer,
    RegionSerializer, CountrySerializer, PassengerSerializer, PassengerListSerializer,
    PassengerDetailSerializer, CoordinatePointDetailSerializer, CoordinatePointCoordinateSerializer,
    DriverSerializer, VehicleSerializer, DriverVehicleAssignmentSerializer, FuelTypeSerializer,
    PassengerTripRequestSerializer, PassengerTripRequestCreateSerializer

)
import random
import string
import requests
import logging
import django_filters
from .models import OrderedPassengerList

from django.conf import settings
from django.db.models import Q
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import date
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_datetime
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from decouple import config
from django.utils.timezone import make_aware
import datetime
from django.contrib.auth.decorators import login_required
from .models import UserSettings
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.utils.timezone import make_aware
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import OrderedPassengerList
from .serializers import OrderedPassengerListSerializer
from rest_framework.decorators import action
from .models import TemporaryPassengerList
from .serializers import TemporaryPassengerListSerializer
from django.utils.timezone import now
from uuid import UUID
from datetime import timedelta





# Включення логування SQL-запитів
logger = logging.getLogger('django.db.backends')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


class CustomLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Виведення повідомлення для перевірки
        print(f"Отримано запит на логін для користувача: {username}")

        user = authenticate(username=username, password=password)

        if user is not None:
            # Перевірка чи заблокований користувач
            print(f"Користувач {username}, is_blocked = {user.is_blocked}")
            if user.is_blocked:
                return Response({"detail": "Доступ не дозволено, зверніться до адміністратора"},
                                status=status.HTTP_403_FORBIDDEN)

            # Якщо користувач не заблокований, продовжуємо логування
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"detail": "Невірні дані для входу"}, status=status.HTTP_401_UNAUTHORIZED)

# Новий клас для створення користувача
class CreateUserView(APIView):
    permission_classes = [AllowAny]  # Доступно всім, щоб реєструвати нового користувача

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Збереження нового користувача
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user  # Отримуємо поточного користувача
        data = request.data

        old_password = data.get("old_password")
        new_password = data.get("new_password")
        confirm_new_password = data.get("confirm_new_password")

        # Перевірка, чи правильний старий пароль
        if not check_password(old_password, user.password):
            return Response({"detail": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        # Перевірка, чи новий пароль співпадає з підтвердженням
        if new_password != confirm_new_password:
            return Response({"detail": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Зміна пароля
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully"}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'id': user.id,
        })

class ForgotPasswordView(APIView):
    def post(self, request):
        email_or_username = request.data.get('email_or_username')

        # Шукаємо користувача за ім'ям або email
        try:
            user = User.objects.get(username=email_or_username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=email_or_username)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Генеруємо новий пароль
        new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        user.set_password(new_password)
        user.save()

        # Відправляємо новий пароль на email
        send_mail(
            'Password Reset Request',
            f'Your new password is: {new_password}\nPlease change it after your first login.',
            'noreply@example.com',  # Вкажіть свою електронну пошту
            [user.email],
            fail_silently=False,
        )

        return Response({'message': 'An email with a new password has been sent to your email.'}, status=status.HTTP_200_OK)

# ViewSet для керування користувачами
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Отримуємо всіх користувачів
    serializer_class = UserSerializer  # Використовуємо існуючий серіалізатор
    permission_classes = [IsAdminUser]  # Тільки для адміністратора

    # Оновлення користувачів
    def update(self, request, roles=None, *args, **kwargs):
        user = self.get_object()
        user.username = request.data.get('username', user.username)
        user.email = request.data.get('email', user.email)
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)

        # Оновлюємо поля для ролей
        user.is_logistic_operator = request.data.get('is_logistic_operator', user.is_logistic_operator)
        user.is_financial_manager = request.data.get('is_financial_manager', user.is_financial_manager)
        user.is_admin = request.data.get('is_admin', user.is_admin)
        user.is_blocked = request.data.get('is_blocked', user.is_blocked)

        # Оновлюємо права адміністратора та персоналу
        #roles = request.data.get('roles', [])
        user.is_staff = 'admin' in roles  # Додаємо адміністративні права за роллю
        user.is_superuser = request.data.get('is_superuser', user.is_superuser)

        # Зберігаємо зміни
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    # Видалення користувачів
    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def send_test_email(request):
    send_mail(
        'Test Email',
        'This is a test email sent from Django.',
        'nextpoint.new@gmail.com',  # From email
        ['your-email@example.com'],  # To email
        fail_silently=False,
    )
    return HttpResponse('Test email sent successfully')

def generate_random_password():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

def forgot_password(request):
    email_or_username = request.POST.get('email_or_username')

    try:
        user = User.objects.get(email=email_or_username) if '@' in email_or_username else User.objects.get(username=email_or_username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

    new_password = generate_random_password()
    user.set_password(new_password)
    user.save()

    send_mail(
        'Password Reset',
        f'Your new password is: {new_password}',
        'nextpoint.new@gmail.com',
        [user.email],
        fail_silently=False,
    )
    return JsonResponse({'message': 'An email with the new password has been sent to your email.'})
class UserListView(APIView):
    permission_classes = [IsAuthenticated]  # Тільки адміністратор має доступ до списку користувачів

    def get(self, request, *args, **kwargs):
        users = User.objects.all()  # Отримуємо всіх користувачів
        serializer = UserSerializer(users, many=True)  # Серіалізуємо їх
        return Response(serializer.data)

@api_view(['POST'])
def update_users(request):
    users_data = request.data
    for user_data in users_data:
        try:
            user = User.objects.get(username=user_data['username'])
            user.is_blocked = user_data.get('is_blocked', user.is_blocked)
            user.is_logistic_operator = user_data.get('is_logistic_operator', user.is_logistic_operator)
            user.is_financial_manager = user_data.get('is_financial_manager', user.is_financial_manager)
            user.is_admin = user_data.get('is_admin', user.is_admin)
            user.is_staff = user_data.get('is_staff', user.is_staff)
            user.is_superuser = user_data.get('is_superuser', user.is_superuser)
            user.save()
        except User.DoesNotExist:
            return Response({'error': f"User {user_data['username']} not found"}, status=404)
    return Response({'message': 'Users updated successfully'})

@api_view(['GET'])
def get_allowed_apps(request):
    user = request.user  # Отримуємо користувача з JWT токену або сесії

    allowed_apps = {
        'operator_ui': user.is_logistic_operator,
        'finance_manager': user.is_financial_manager,
        'admin': user.is_admin
    }

    return Response(allowed_apps)

@permission_classes([IsAuthenticated])  # Замість @login_required використовуємо пермісію
def get_user_roles(request):
    user = request.user
    roles = {
        'is_logistic_operator': user.is_logistic_operator,
        'is_financial_manager': user.is_financial_manager,
        'is_admin': user.is_admin,
    }
    return JsonResponse(roles)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_settings(request):
    if request.method == "POST":
        data = request.data
        settings, created = UserSettings.objects.get_or_create(user=request.user)

        settings.date_interval = data.get("date_interval", settings.date_interval)
        settings.arrival_time_tolerance = data.get("arrival_time_tolerance", settings.arrival_time_tolerance)
        settings.allow_mixed_directions = data.get("allow_mixed_directions", settings.allow_mixed_directions)
        settings.max_route_duration = data.get("max_route_duration", settings.max_route_duration)
        settings.max_route_distance = data.get("max_route_distance", settings.max_route_distance)
        settings.max_stops = data.get("max_stops", settings.max_stops)
        settings.max_passengers = data.get("max_passengers", settings.max_passengers)
        settings.min_passengers = data.get("min_passengers", settings.min_passengers)
        settings.allow_multiple_work_addresses = data.get("allow_multiple_work_addresses", settings.allow_multiple_work_addresses)

        settings.save()

        return Response({"message": "Settings updated successfully."})

    return Response({"error": "Invalid request method."}, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_settings(request):
    settings, created = UserSettings.objects.get_or_create(user=request.user)
    return Response({
        "date_interval": settings.date_interval,
        "arrival_time_tolerance": settings.arrival_time_tolerance,
        "allow_mixed_directions": settings.allow_mixed_directions,
        "max_route_duration": settings.max_route_duration,
        "max_route_distance": settings.max_route_distance,
        "max_stops": settings.max_stops,
        "max_passengers": settings.max_passengers,
        "min_passengers": settings.min_passengers,
        "allow_multiple_work_addresses": settings.allow_multiple_work_addresses,
    })

class RouteListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        routes = Route.objects.all().select_related('start_point__city', 'start_point__district', 'start_point__street', 'end_point__city', 'end_point__district', 'end_point__street')
        serializer = RouteSerializer(routes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FilteredRouteListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Отримуємо лише ті маршрути, що стосуються вибраних пасажирів
        selected_passenger_ids = Passenger.objects.filter(is_selected=True).values_list('id', flat=True)
        selected_route_ids = PassengerRoute.objects.filter(passenger_id__in=selected_passenger_ids).values_list(
            'route_id', flat=True)

        # Фільтруємо маршрути за обраними route_id
        routes = Route.objects.filter(route_id__in=selected_route_ids)

        # Серіалізуємо і повертаємо маршрути
        route_serializer = RouteSerializer(routes, many=True)
        return Response(route_serializer.data, status=status.HTTP_200_OK)


class FilteredCoordinatePointsView(APIView):
    def get(self, request):
        # Отримуємо параметр is_active із запиту
        is_active_param = request.query_params.get('is_active')

        # Отримуємо всіх пасажирів, у яких поле is_selected=True
        selected_passengers = Passenger.objects.filter(is_selected=True)

        # Формуємо базові запити для кожного типу точки координат
        pickup_points = CoordinatePoint.objects.filter(id__in=selected_passengers.values_list('pickup_addresses', flat=True))
        dropoff_points = CoordinatePoint.objects.filter(id__in=selected_passengers.values_list('dropoff_addresses', flat=True))
        work_points = CoordinatePoint.objects.filter(id__in=selected_passengers.values_list('work_addresses', flat=True))

        # Застосовуємо фільтр is_active лише якщо параметр встановлено в "true"
        if is_active_param == 'true':
            pickup_points = pickup_points.filter(is_active=True)
            dropoff_points = dropoff_points.filter(is_active=True)
            work_points = work_points.filter(is_active=True)

        # Об'єднуємо всі точки координат, уникаючи дублікатів
        all_coordinates = pickup_points.union(dropoff_points, work_points)

        # Використовуємо серіалізатор для відображення даних
        serializer = CoordinatePointDetailSerializer(all_coordinates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)





@api_view(['GET'])
def filtered_coordinate_points(request):
    # Get the `is_active` parameter from the query string
    is_active = request.query_params.get('is_active')

    # Filter points based on `is_active` if it exists
    if is_active is not None:
        points = CoordinatePoint.objects.filter(is_active=(is_active.lower() == 'true'))
    else:
        points = CoordinatePoint.objects.all()

    serializer = CoordinatePointSerializer(points, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def toggle_active_passenger(request, passenger_id):
    try:
        passenger = Passenger.objects.get(id=passenger_id)
        is_active = request.data.get('is_active', not passenger.is_active)
        passenger.is_active = is_active
        passenger.save()
        return Response({'success': True, 'is_active': passenger.is_active}, status=status.HTTP_200_OK)
    except Passenger.DoesNotExist:
        return Response({'error': 'Passenger not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_select_all_passengers(request):
    is_selected = request.data.get('is_selected', False)
    Passenger.objects.all().update(is_selected=is_selected)
    return Response({'success': True, 'is_selected': is_selected})

@api_view(['POST'])
def toggle_select_passenger(request, passenger_id):
    try:
        # Знайти пасажира за ID
        passenger = Passenger.objects.get(id=passenger_id)
        # Отримати нове значення для is_selected з запиту
        is_selected = request.data.get('is_selected', not passenger.is_selected)
        # Оновити поле is_selected
        passenger.is_selected = is_selected
        passenger.save()
        return Response({'success': True, 'is_selected': passenger.is_selected}, status=status.HTTP_200_OK)
    except Passenger.DoesNotExist:
        return Response({'error': 'Passenger not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PassengerListView(ListAPIView):
    queryset = Passenger.objects.all() # Запит на отримання всіх пасажирів
    #print(f"Fetched passengers: {queryset}")
    serializer_class = PassengerListSerializer  # Додаємо клас серіалізатора для обробки даних
    print(f"Serialized passengers data: {serializer_class.data}")
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_active']  # Додаємо поле для фільтрації


class CoordinatePointListView(generics.ListAPIView):
    serializer_class = CoordinatePointSerializer

    def get_queryset(self):
        queryset = CoordinatePoint.objects.all()
        is_active = self.request.query_params.get('is_active')

        # Показуємо лише активні точки, якщо `is_active` встановлено в "true".
        if is_active == 'true':
            queryset = queryset.filter(is_active=True)

        # Якщо `is_active` має значення "false", повертаються всі точки (без фільтрації).
        return queryset


@api_view(['POST'])
def verify_address(request):
    address = request.data.get('address')
    google_maps_api_key = 'GOOGLE_MAPS_API_KEY'
    google_maps_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={google_maps_api_key}"

    response = requests.get(google_maps_url)
    data = response.json()

    if response.status_code == 200 and data['status'] == 'OK':
        location = data['results'][0]['geometry']['location']
        return Response({
            "latitude": location['lat'],
            "longitude": location['lng'],
            "status": "Address found"
        })
    else:
        return Response({
            "status": "Address not found or invalid",
            "error_message": data.get('error_message', 'No details provided')
        }, status=400)

@api_view(['POST'])
def verify_and_save_passenger(request):
    print(request.data)
    pickup_addresses = request.data.get('pickup_addresses', [])
    dropoff_addresses = request.data.get('dropoff_addresses', [])
    work_addresses = request.data.get('work_addresses', [])

    serializer = PassengerSerializer(data=request.data)

    if serializer.is_valid():
        print("Дані валідні, зберігаємо пасажира.")
        serializer.save()
        return Response({'success': 'Passenger saved successfully'}, status=status.HTTP_201_CREATED)
    else:
        print(f"Помилки валідації: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Перевіряємо, чи введені всі адреси
    if not pickup_addresses:
        return Response({'error': 'At least one pickup address is required'}, status=status.HTTP_400_BAD_REQUEST)


    # Верифікація адрес через Google Geocoding API
    google_maps_api_key = 'GOOGLE_MAPS_API_KEY' # скопіювати тут https://console.cloud.google.com/apis/credentials?project=nextpointlogix
    pickup_coords = [verify_address_via_google(addr, google_maps_api_key) for addr in pickup_addresses]
    dropoff_coords = [verify_address_via_google(addr, google_maps_api_key) for addr in dropoff_addresses]
    work_coords = [verify_address_via_google(addr, google_maps_api_key) for addr in work_addresses]

    # Якщо одна з адрес не верифікована, повертаємо помилку
    if not all(pickup_coords):
        return Response({'error': 'At least one pickup address could not be verified'}, status=status.HTTP_400_BAD_REQUEST)

        # Create CoordinatePoints only for valid coordinates

    pickup_points = [
         CoordinatePoint.objects.create(latitude=coord['lat'], longitude=coord['lng'], point_type='pickup')
        for coord in pickup_coords if coord
    ]
    dropoff_points = [
        CoordinatePoint.objects.create(latitude=coord['lat'], longitude=coord['lng'], point_type='dropoff')
        for coord in dropoff_coords if coord
    ]
    work_points = [
        CoordinatePoint.objects.create(latitude=coord['lat'], longitude=coord['lng'], point_type='work')
        for coord in work_coords if coord
    ]

    # Create new passenger
    new_passenger = Passenger.objects.create(
        first_name=request.data.get('first_name'),
        last_name=request.data.get('last_name'),
        department=request.data.get('department'),
        phone_number=request.data.get('phone_number'),
        email=request.data.get('email'),
    )

    # Set the addresses
    new_passenger.pickup_addresses.set(pickup_points)
    new_passenger.dropoff_addresses.set(dropoff_points)
    new_passenger.work_addresses.set(work_points)
        # Якщо всі поля заповнені, зберігаємо пасажира та координати

    return Response({'success': 'Passenger saved successfully'}, status=status.HTTP_201_CREATED)


def verify_address_via_google(address, google_maps_api_key):
    google_maps_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={google_maps_api_key}"
    response = requests.get(google_maps_url)

    if response.status_code == 200:
        result = response.json()
        if result['results']:
            # Повертаємо перші знайдені координати
            return result['results'][0]['geometry']['location']
        else:
            return None
    else:
        return None


class PassengerCreateView(generics.CreateAPIView):
    queryset = Passenger.objects.all()
    serializer_class = PassengerDetailSerializer

    def create(self, request, *args, **kwargs):
        # Логування запиту
        print(f"Received data: {request.data}")

        # Отримання pickup addresses IDs
        pickup_ids = request.data.get('pickup_addresses', [])
        print(f"Pickup IDs: {pickup_ids}")

        pickup_points = CoordinatePoint.objects.filter(id__in=pickup_ids).values_list('id', flat=True)
        print(f"Pickup points: {pickup_points}")

        # Отримання dropoff addresses IDs
        dropoff_ids = request.data.get('dropoff_addresses', [])
        print(f"Dropoff IDs: {dropoff_ids}")

        dropoff_points = CoordinatePoint.objects.filter(id__in=dropoff_ids).values_list('id', flat=True)
        print(f"Dropoff points: {dropoff_points}")

        # Отримання work addresses IDs
        work_ids = request.data.get('work_addresses', [])
        print(f"Work IDs: {work_ids}")

        work_points = CoordinatePoint.objects.filter(id__in=work_ids).values_list('id', flat=True)
        print(f"Work points: {work_points}")

        # Видаляємо pickup, dropoff, і work адреси з validated_data, оскільки ми не можемо зберігати їх напряму
        passenger_data = request.data.copy()  # Копіюємо дані пасажира, щоб не змінювати оригінал
        passenger_data.pop('pickup_addresses', None)
        passenger_data.pop('dropoff_addresses', None)
        passenger_data.pop('work_addresses', None)

        # Створення пасажира за допомогою серіалізатора
        serializer = self.get_serializer(data=passenger_data)
        serializer.is_valid(raise_exception=True)
        print("Serializer is valid.")

        passenger = serializer.save()
        print("Passenger saved.")

        # Прив'язуємо координати до пасажира (передаємо лише IDs)
        passenger.pickup_addresses.set(pickup_points) # Тепер це буде список id
        print("Assigned pickup addresses to the passenger.")
        passenger.dropoff_addresses.set(dropoff_points) # Тепер це буде список id
        print("Assigned dropoff addresses to the passenger.")
        passenger.work_addresses.set(work_points) # Тепер це буде список id
        print("Assigned work addresses to the passenger.")

        response_data = serializer.data

        response_data['id'] = passenger.id  # Додаємо ID пасажира
        headers = self.get_success_headers(serializer.data)
        print("Passenger created successfully.")
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['GET'])
def get_countries(request):
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_regions(request, country_id):
    regions = Region.objects.filter(country_id=country_id)
    serializer = RegionSerializer(regions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_districts(request, region_id):
    districts = District.objects.filter(region_id=region_id)
    serializer = DistrictSerializer(districts, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_google_maps_key(request):
    return Response({'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY})


class CoordinatePointCreateView(APIView):
    def post(self, request):
        address_data = request.data.get('address', {})

        # Перевірка на наявність необхідних даних
        required_fields = ['country', 'region', 'district', 'city', 'street', 'house_number', 'latitude', 'longitude']
        missing_fields = [field for field in required_fields if not address_data.get(field)]

        if missing_fields:
            # Якщо є відсутні поля, повертаємо нотифікацію без помилки
            return Response(
                {'message': "The address form contains empty fields, so the address is not created", 'missing_fields': missing_fields},
                status=status.HTTP_200_OK
            )
        # Створюємо або отримуємо координати
        try:
            coordinate_point = self.create_coordinate_point(address_data)
            return Response({'coordinate_point_id': coordinate_point.id}, status=status.HTTP_201_CREATED)
        except ValueError as ve:
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Додаємо узагальнене повідомлення для несподіваних помилок
            return Response({'error': 'Помилка при створенні координатної точки'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create_coordinate_point(self, address_data):
        try:
            # Отримуємо країну, область і район за id — вони мають існувати
            country = Country.objects.get(id=address_data.get('country'))
            region = Region.objects.get(id=address_data.get('region'), country=country)
            district = District.objects.get(id=address_data.get('district'), region=region)

            city, created = City.objects.get_or_create(name=address_data.get('city'), region=region)
            street, created = Street.objects.get_or_create(name=address_data.get('street'), city=city)

            # Retrieve or create the House instance
            house_number = address_data.get('house_number')
            house = None
            if house_number:
                house, created = House.objects.get_or_create(street=street, house_number=house_number)

            # Отримуємо дані `created_by_id`, `owner_id` і `owner_type`
            created_by_id = address_data.get('created_by_id')
            created_by_user = User.objects.get(id=created_by_id) if created_by_id else None
            owner_id = address_data.get('owner_id')
            owner_type = address_data.get('owner_type')

            # Create the CoordinatePoint and link to the House instance
            coordinate_point = CoordinatePoint.objects.create(
                latitude=address_data.get('latitude'),
                longitude=address_data.get('longitude'),
                country=country,
                region=region,
                district=district,
                city=city,
                street=street,
                house=house,  # Assign the House instance here
                point_type=address_data.get('point_type'),  # pickup, dropoff або work
                created_by=created_by_user,
                owner_type=owner_type,
                owner_id=owner_id,
            )

        except Country.DoesNotExist:
            raise ValueError("Вказана країна не існує.")
        except Region.DoesNotExist:
            raise ValueError("Вказана область не існує.")
        except District.DoesNotExist:
            raise ValueError("Вказаний район не існує.")
        except User.DoesNotExist:
            raise ValueError("Користувач, який створив точку координат, не існує.")
        except Exception as e:
            raise ValueError(f"Помилка створення координатної точки: {str(e)}")

        return coordinate_point


def get_passengers(request):
    # Отримуємо параметр is_active із запиту, приводимо його до булевого значення
    is_active = request.GET.get('is_active', 'true').lower() == 'true'
    # Фільтруємо дані відповідно до значення is_active
    passengers = Passenger.objects.filter(is_active=is_active)
    # Серіалізуємо дані пасажирів та повертаємо у форматі JSON
    serialized_passengers = list(passengers.values())
    return JsonResponse(serialized_passengers, safe=False)

@api_view(['PUT'])
def update_passenger(request, id):
    try:
        passenger = Passenger.objects.get(id=id)
    except Passenger.DoesNotExist:
        return Response({'error': 'Passenger not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PassengerSerializer(passenger, data=request.data, partial=True)  # partial=True для часткового оновлення
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PassengerAddressesView(APIView):
    def get(self, request, passenger_id):
        """
        Отримання всіх адрес для певного пасажира.
        """
        passenger = get_object_or_404(Passenger, id=passenger_id)
        addresses = CoordinatePoint.objects.filter(owner_id=passenger.id, owner_type='passenger')
        serializer = CoordinatePointSerializer(addresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, passenger_id):
        """
        Оновлення існуючих адрес для пасажира.
        """
        passenger = get_object_or_404(Passenger, id=passenger_id)
        address_data = request.data.get('addresses', [])

        for address in address_data:
            address_id = address.get('id')
            if address_id:
                # Оновлення існуючої адреси
                coordinate_point = get_object_or_404(CoordinatePoint, id=address_id, owner_id=passenger.id,
                                                     owner_type='passenger')
                serializer = CoordinatePointSerializer(coordinate_point, data=address, partial=True)
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Addresses updated successfully."}, status=status.HTTP_200_OK)

    def post(self, request, passenger_id):
        """
        Додавання нових адрес для пасажира.
        """
        passenger = get_object_or_404(Passenger, id=passenger_id)
        new_addresses = request.data.get('new_addresses', [])

        for address in new_addresses:
            address['owner_id'] = passenger.id
            address['owner_type'] = 'passenger'
            serializer = CoordinatePointSerializer(data=address)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "New addresses added successfully."}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_passenger(request, id):
    try:
        passenger = Passenger.objects.get(pk=id)
    except Passenger.DoesNotExist:
        return Response({'error': 'Passenger not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PassengerSerializer(passenger)
    return Response(serializer.data)


class UpdatePassengerAddressesView(APIView):
    def put(self, request, passenger_id):
        try:
            addresses_data = request.data  # Масив з даними адрес
            print(f"Received data for passenger_id {passenger_id}: {addresses_data}")

            for address_data in addresses_data:
                try:
                    # Отримуємо об'єкт CoordinatePoint для оновлення
                    address = CoordinatePoint.objects.get(id=address_data['id'])
                    print(f"Updating CoordinatePoint with ID: {address.id}")

                    # Перевірка наявності або створення нового міста
                    city_name = address_data.get('city')
                    if city_name:
                        city_queryset = City.objects.filter(name=city_name)
                        city_instance = city_queryset.first() if city_queryset.exists() else City.objects.create(
                            name=city_name)
                        address.city = city_instance
                        print(f"City set to: {city_instance.name}")

                    # Перевірка наявності або створення нової вулиці
                    street_name = address_data.get('street')
                    if street_name:
                        street_instance, created = Street.objects.get_or_create(name=street_name, city=address.city)
                        address.street = street_instance
                        print(f"Street set to: {street_instance.name}, created: {created}")

                    # Перевірка наявності або створення нового будинку
                    house_number = address_data.get('house_number')
                    if house_number:
                        house_instance, created = House.objects.get_or_create(house_number=house_number,
                                                                              street=address.street)
                        if created:
                            print(f"House '{house_number}' created on street '{street_name}'.")
                        address.house = house_instance

                    # Оновлення широти та довготи
                    latitude = address_data.get('latitude')
                    longitude = address_data.get('longitude')
                    if latitude and longitude:
                        address.latitude = latitude
                        address.longitude = longitude
                        print(f"Updated latitude to {latitude} and longitude to {longitude}")
                    else:
                        print(f"Latitude or longitude missing: {latitude}, {longitude}")

                    # Зберігаємо об'єкт CoordinatePoint
                    address.save()
                    print(f"CoordinatePoint {address.id} saved successfully.")

                except CoordinatePoint.DoesNotExist:
                    print(f"CoordinatePoint with ID {address_data.get('id')} does not exist.")
                    return Response({"error": "Address not found."}, status=status.HTTP_404_NOT_FOUND)

            return Response({"message": "Addresses updated successfully!"}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error updating addresses: {e}")
            return Response({"error": "An error occurred while updating addresses."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        except Exception as e:
            print(f"Server error: {str(e)}")
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetHouseNumberView(APIView):
    def get(self, request, coordinate_point_id):
        try:
            # Отримуємо об'єкт CoordinatePoint за ID
            coordinate_point = CoordinatePoint.objects.get(id=coordinate_point_id)

            # Перевіряємо наявність прив'язаного будинку
            if coordinate_point.house:
                house_number = coordinate_point.house.house_number
                return Response({'house_number': house_number}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'House number not found for this coordinate point.'},
                                status=status.HTTP_404_NOT_FOUND)

        except CoordinatePoint.DoesNotExist:
            return Response({'error': 'Coordinate point not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ToggleCoordinatePointActiveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        try:
            # Retrieve the CoordinatePoint by ID
            coordinate_point = CoordinatePoint.objects.get(id=id)

            # Toggle the is_active status
            coordinate_point.is_active = not coordinate_point.is_active
            coordinate_point.save()

            # Return the updated status
            return Response({'is_active': coordinate_point.is_active}, status=status.HTTP_200_OK)

        except CoordinatePoint.DoesNotExist:
            return Response({'error': 'CoordinatePoint not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class HasPickupAddressView(APIView):
    def get(self, request, passenger_id):
        try:
            passenger = Passenger.objects.get(id=passenger_id)
            has_pickup = passenger.pickup_addresses.exists()  # Перевірка наявності хоча б однієї адреси
            return Response({'hasPickupAddress': has_pickup}, status=status.HTTP_200_OK)
        except Passenger.DoesNotExist:
            return Response({'hasPickupAddress': False}, status=status.HTTP_404_NOT_FOUND)


class CoordinatePointUpdateView(APIView):
    def get(self, request, id):
        try:
            point = CoordinatePoint.objects.get(id=id)
            serializer = CoordinatePointSerializer(point)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CoordinatePoint.DoesNotExist:
            return Response({'error': 'CoordinatePoint not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        print("Отримані дані:", request.data)  # Лог для перевірки отриманих даних

        try:
            # Отримуємо точку координат за ID
            point = CoordinatePoint.objects.get(id=id)
            if 'latitude' in request.data:
                request.data['latitude'] = round(float(request.data['latitude']), 6)
            if 'longitude' in request.data:
                request.data['longitude'] = round(float(request.data['longitude']), 6)

        except CoordinatePoint.DoesNotExist:
            # У разі відсутності об'єкта повертаємо 404
            return Response({'error': 'CoordinatePoint not found'}, status=status.HTTP_404_NOT_FOUND)

        # Передаємо дані в серіалізатор із partial=True для часткових оновлень
        serializer = CoordinatePointSerializer(point, data=request.data, partial=True)

        # Перевіряємо валідність даних
        if serializer.is_valid():
            serializer.save()  # Зберігаємо оновлення
            print("Успішно оновлено:", serializer.data)  # Лог успішного збереження
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Якщо дані не валідні, повертаємо помилки
        print("Помилки серіалізатора:", serializer.errors)  # Лог помилок
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateCoordinatesView(APIView):
    """
    Ендпоінт для оновлення тільки широти і довготи координатної точки.
    """

    def put(self, request, id):
        print(f"Запит на оновлення координат ID {id}: {request.data}")
        try:
            point = CoordinatePoint.objects.get(id=id)
            serializer = CoordinatePointCoordinateSerializer(point, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print(f"Координати успішно оновлені для ID {id}")
                return Response(serializer.data, status=status.HTTP_200_OK)
            print(f"Помилки серіалізатора: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CoordinatePoint.DoesNotExist:
            print(f"CoordinatePoint з ID {id} не знайдено")
            return Response({'error': 'CoordinatePoint not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Помилка сервера: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DriverCreateView(CreateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class DriverUpdateView(UpdateAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class DriverListView(ListAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class DriverDetailView(RetrieveAPIView):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated]

class VehicleListCreateView(generics.ListCreateAPIView):
    """
    Представлення для отримання списку транспортних засобів і створення нового.
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

@api_view(['PUT'])
def bulk_update_drivers(request):
    drivers_data = request.data
    errors = []

    for driver_data in drivers_data:
        try:
            driver = Driver.objects.get(driver_id=driver_data['driver_id'])
            serializer = DriverSerializer(driver, data=driver_data, partial=True)  # partial=True для часткового оновлення
            if serializer.is_valid():
                serializer.save()
            else:
                errors.append({driver_data['driver_id']: serializer.errors})
        except Driver.DoesNotExist:
            errors.append({driver_data['driver_id']: "Driver not found"})
        except Exception as e:
            errors.append({driver_data['driver_id']: str(e)})

    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Drivers updated successfully"}, status=status.HTTP_200_OK)

class VehicleRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    Представлення для отримання, оновлення або видалення конкретного транспортного засобу.
    """
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
class DriverVehicleAssignmentViewSet(ModelViewSet):
    queryset = DriverVehicleAssignment.objects.all()
    serializer_class = DriverVehicleAssignmentSerializer

class AssignVehicleToDriverView(APIView):
    def post(self, request, driver_id):
        try:
            vehicle_id = request.data.get('vehicle_id')
            assignment_date = request.data.get('assignment_date')
            order_number = request.data.get('order_number', 'NPL-000000')
            is_active = request.data.get('is_active', True)

            driver = get_object_or_404(Driver, pk=driver_id)
            vehicle = get_object_or_404(Vehicle, pk=vehicle_id)

            assignment = DriverVehicleAssignment.objects.create(
                driver=driver,
                vehicle=vehicle,
                assignment_date=assignment_date,
                order_number=order_number,
                is_active=is_active
            )
            return Response({'message': 'Vehicle assigned successfully.'}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class AssignedVehiclesView(APIView):
    def get(self, request, id):
        # Перевіряємо, чи існує водій
        driver = get_object_or_404(Driver, pk=id)

        # Отримуємо всі активні призначення для цього водія
        assigned_vehicles = Vehicle.objects.filter(
            driver_assignments__driver=driver,
            driver_assignments__is_active=True
        )

        # Формуємо відповідь
        vehicles_data = [
            {
                "vehicle_id": vehicle.vehicle_id,
                "make": vehicle.make,
                "model": vehicle.model,
                "license_plate": vehicle.license_plate,
                'license_plate_format': vehicle.license_plate_format,
                'year': vehicle.year,
                'engine_volume': vehicle.engine_volume,
                'registered_to': vehicle.registered_to,
                'chassis_number': vehicle.chassis_number,
                'city_fuel_consumption': vehicle.city_fuel_consumption,
                'highway_fuel_consumption': vehicle.highway_fuel_consumption,
                'fuel_type': {
                    'fuel_type_id': vehicle.fuel_type.fuel_type_id,
                    'type': vehicle.fuel_type.type
                } if vehicle.fuel_type else None,
                'capacity': vehicle.capacity,
                'image_url': vehicle.image_url,
                'active': vehicle.active,
            }
            for vehicle in assigned_vehicles
        ]
        return Response(vehicles_data, status=200)


class FuelTypeViewSet(ModelViewSet):
    queryset = FuelType.objects.all()
    serializer_class = FuelTypeSerializer

@api_view(['POST'])
def update_fuel_type(request):
    """
    Оновлює тип пального для конкретного транспортного засобу.
    """
    vehicle_id = request.data.get('vehicle_id')
    fuel_type_id = request.data.get('fuel_type_id')

    if not vehicle_id or not fuel_type_id:
        return Response(
            {"error": "Both 'vehicle_id' and 'fuel_type_id' are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        # Отримуємо транспортний засіб
        vehicle = Vehicle.objects.get(vehicle_id=vehicle_id)
        # Отримуємо тип пального
        fuel_type = FuelType.objects.get(fuel_type_id=fuel_type_id)
        # Оновлюємо тип пального
        vehicle.fuel_type = fuel_type
        vehicle.save()

        return Response(
            {"message": "Fuel type updated successfully."},
            status=status.HTTP_200_OK,
        )
    except Vehicle.DoesNotExist:
        return Response(
            {"error": f"Vehicle with ID {vehicle_id} does not exist."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except FuelType.DoesNotExist:
        return Response(
            {"error": f"Fuel type with ID {fuel_type_id} does not exist."},
            status=status.HTTP_404_NOT_FOUND,
        )
    except Exception as e:
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['PUT'])
def bulk_update_vehicles(request):
    vehicles_data = request.data
    errors = []

    for vehicle_data in vehicles_data:
        try:
            vehicle = Vehicle.objects.get(vehicle_id=vehicle_data['vehicle_id'])  # Використовуємо `vehicle_id`
            serializer = VehicleSerializer(vehicle, data=vehicle_data, partial=True)  # partial=True для часткового оновлення
            if serializer.is_valid():
                serializer.save()
            else:
                errors.append({vehicle_data['vehicle_id']: serializer.errors})
        except Vehicle.DoesNotExist:
            errors.append({vehicle_data['vehicle_id']: "Vehicle not found"})
        except Exception as e:
            errors.append({vehicle_data['vehicle_id']: str(e)})

    if errors:
        return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Vehicles updated successfully"}, status=status.HTTP_200_OK)


def get_assigned_drivers(request, vehicle_id):
    try:
        # Отримуємо всі активні призначення для транспортного засобу
        assignments = DriverVehicleAssignment.objects.filter(vehicle_id=vehicle_id, is_active=True)

        # Отримуємо список ID водіїв
        driver_ids = assignments.values_list('driver_id', flat=True)

        # Отримуємо повну інформацію про водіїв
        drivers = Driver.objects.filter(pk__in=driver_ids)

        drivers_data = [
            {
                'driver_id': driver.driver_id,
                'first_name': driver.first_name,
                'last_name': driver.last_name,
                'middle_name': driver.middle_name,
                'license_number': driver.license_number,
                'phone_number': driver.phone_number,
                'email': driver.email,
                'year_of_birth': driver.year_of_birth,
                'contract_type': driver.contract_type,
                'residence_address': driver.residence_address,
                'registration_address': driver.registration_address,
                'driving_experience': driver.driving_experience,
                'citizenship': driver.citizenship,
                'license_category': driver.license_category,
                'license_issue_date': driver.license_issue_date,
                'license_issuer': driver.license_issuer,
                'active': driver.active,
                'image_url': driver.image_url,
            }
            for driver in drivers
        ]

        return JsonResponse(drivers_data, safe=False)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@csrf_exempt
def assign_driver(request, vehicle_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            assignment = DriverVehicleAssignment.objects.create(
                assignment_date=data.get('assignment_date', date.today()),
                order_number=data.get('order_number', 'NPL-000000'),
                is_active=data.get('is_active', True),
                driver_id=data['driver_id'],
                vehicle_id=vehicle_id
            )
            return JsonResponse({'status': 'success', 'assignment_id': assignment.id}, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


@csrf_exempt
def remove_driver(request, vehicle_id):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        DriverVehicleAssignment.objects.filter(driver_id=data['driver_id'], vehicle_id=vehicle_id, is_active=True).update(is_active=False)
        return JsonResponse({'status': 'success'}, status=200)


class RemoveDriverVehicleAssignmentView(APIView):
    def delete(self, request):
        try:
            # Отримуємо параметри з тіла запиту
            vehicle_id = request.data.get('vehicle_id')
            driver_id = request.data.get('driver_id')

            if not vehicle_id or not driver_id:
                return Response({'error': 'Both vehicle_id and driver_id are required.'}, status=400)

            # Знаходимо запис
            assignment = get_object_or_404(
                DriverVehicleAssignment,
                vehicle_id=vehicle_id,
                driver_id=driver_id,
                is_active=True  # Перевіряємо, що запис активний
            )

            # Видаляємо або деактивуємо запис
            assignment.is_active = False
            assignment.save()

            return Response({'message': 'Assignment removed successfully.'}, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=500)



class PassengerTripRequestListView(ListAPIView):
    queryset = PassengerTripRequest.objects.select_related(
        'city', 'street', 'house', 'coordinatepoint'
    )
    serializer_class = PassengerTripRequestSerializer

    def list(self, request, *args, **kwargs):
        print("Method 'list' was called")
        logging.info("Method 'list' was called")
        queryset = self.get_queryset()
        logging.info(f"Final Queryset Count: {queryset.count()}")
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        print("Method 'get_queryset' was called")
        queryset = super().get_queryset()
        logging.info(f"Initial Queryset Count: {queryset.count()}")

        # Фільтр за `is_active`
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            logging.info(f"Is Active Parameter: {is_active}")
            if is_active.lower() == 'true':
                queryset = queryset.filter(is_active=True)
            elif is_active.lower() == 'false':
                queryset = queryset.filter(is_active=False)

        # Фільтрація за датами
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if start_date or end_date:
            try:
                if start_date:
                    start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S"))
                    logging.info(f"Start Date: {start_date}")
                if end_date:
                    end_date = make_aware(datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S"))
                    logging.info(f"End Date: {end_date}")
            except ValueError as e:
                logging.error(f"Invalid Date Format: {e}")
                return queryset.none()

            if start_date and end_date:
                queryset = queryset.filter(
                    Q(departure_time__range=(start_date, end_date)) |
                    Q(arrival_time__range=(start_date, end_date))
                )
            elif start_date:
                queryset = queryset.filter(
                    Q(departure_time__gte=start_date) | Q(arrival_time__gte=start_date)
                )
            elif end_date:
                queryset = queryset.filter(
                    Q(departure_time__lte=end_date) | Q(arrival_time__lte=end_date)
                )
            logging.info(f"Filtered by Date Count: {queryset.count()}")

        # Фільтрація за напрямками
        direction = self.request.query_params.get('direction')
        if direction:
            directions = direction.split(',')
            logging.info(f"Filtering by Directions: {directions}")
            queryset = queryset.filter(direction__in=directions)

        # Пошук
        search_query = self.request.query_params.get('search')
        if search_query:
            logging.info(f"Search Query: {search_query}")
            queryset = queryset.filter(
                Q(passenger__first_name__icontains=search_query) |
                Q(passenger__last_name__icontains=search_query) |
                Q(comment__icontains=search_query)
            )

        logging.info(f"Final Queryset Count: {queryset.count()}")
        return queryset




class PassengerTripRequestViewSet(ModelViewSet):
    queryset = PassengerTripRequest.objects.all()
    serializer_class = PassengerTripRequestSerializer

    @action(detail=True, methods=["patch"])
    def update_status(self, request, pk=None):
        try:
            instance = self.get_object()
            is_active = request.data.get("is_active", None)
            if is_active is not None:
                instance.is_active = is_active
                instance.save()
                return Response({"message": "Status updated successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "is_active field is required."}, status=status.HTTP_400_BAD_REQUEST)
        except PassengerTripRequest.DoesNotExist:
            return Response({"error": "Request not found."}, status=status.HTTP_404_NOT_FOUND)


# Завантажуємо ключ із .env
GOOGLE_API_KEY = config("GOOGLE_MAPS_API_KEY")

OPTIMIZATION_THRESHOLD = 10  # 🔴 Поріг оптимізації (у відсотках)

@csrf_exempt
def calculate_route(request):
    if request.method == "POST":
        try:
            # Розбір JSON-запиту
            data = json.loads(request.body)
            origin = data.get("origin")
            destination = data.get("destination")
            waypoints = data.get("waypoints", [])
            language = data.get("language", "en")

            # 🔹 1. Отримуємо маршрут **без оптимізації**
            standard_params = {
                "origin": origin,
                "destination": destination,
                "waypoints": "|".join(waypoints),
                "key": GOOGLE_API_KEY,
                "language": language,
            }
            standard_response = requests.get("https://maps.googleapis.com/maps/api/directions/json", params=standard_params)
            standard_data = standard_response.json()

            if standard_data.get("status") != "OK":
                return JsonResponse({"error": "Google API error (Standard Route)", "details": standard_data}, status=400)

            # 🔹 2. Отримуємо маршрут **з оптимізацією**
            optimized_params = standard_params.copy()
            optimized_params["waypoints"] = f"optimize:true|{'|'.join(waypoints)}"
            optimized_response = requests.get("https://maps.googleapis.com/maps/api/directions/json", params=optimized_params)
            optimized_data = optimized_response.json()

            if optimized_data.get("status") != "OK":
                return JsonResponse({"error": "Google API error (Optimized Route)", "details": optimized_data}, status=400)

            # 📌 Функція обчислення параметрів маршруту
            def extract_route_info(route_data):
                route = route_data["routes"][0]
                legs = route["legs"]
                total_distance = sum(leg["distance"]["value"] for leg in legs) / 1000  # км
                total_duration = sum(leg["duration"]["value"] for leg in legs) / 60  # хвилини

                cumulative_durations = []
                accumulated_time = 0
                for leg in legs:
                    accumulated_time += leg["duration"]["value"] / 60  # Хвилини
                    cumulative_durations.append(accumulated_time)

                return {
                    "total_distance": total_distance,
                    "total_duration": total_duration,
                    "cumulative_durations": cumulative_durations,
                    "start_address": legs[0]["start_address"],
                    "end_address": legs[-1]["end_address"],
                }

            # 🔹 Отримуємо деталі для обох маршрутів
            standard_route = extract_route_info(standard_data)
            optimized_route = extract_route_info(optimized_data)
            optimized_order = optimized_data["routes"][0].get("waypoint_order", list(range(len(waypoints))))

            # 📌 Обчислення різниці в оптимізації
            distance_difference = ((standard_route["total_distance"] - optimized_route["total_distance"]) / standard_route["total_distance"]) * 100
            duration_difference = ((standard_route["total_duration"] - optimized_route["total_duration"]) / standard_route["total_duration"]) * 100

            # 🔹 Якщо оптимізація незначна, не показуємо другий маршрут
            is_significant_optimization = distance_difference > OPTIMIZATION_THRESHOLD or duration_difference > OPTIMIZATION_THRESHOLD

            result = {
                "standard_route": standard_route,  # Дані для маршруту без оптимізації
                "optimized_route": optimized_route if is_significant_optimization else None,  # Приховуємо, якщо немає значної оптимізації
                "optimized_order": optimized_order if is_significant_optimization else None,  # Приховуємо, якщо немає значної оптимізації
                "optimization_applied": is_significant_optimization,  # Флаг, чи була застосована оптимізація
            }

            return JsonResponse(result)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)

from rest_framework.generics import ListAPIView
from .models import PassengerTripRequest
from .serializers import PassengerTripRequestSerializer
from django.db.models import Q
from django.utils.timezone import make_aware
from datetime import datetime


class FilteredPassengerTripRequestView(ListAPIView):
    queryset = PassengerTripRequest.objects.all()
    serializer_class = PassengerTripRequestSerializer

    def get_queryset(self):
        logger.info("Method 'get_queryset' was called")
        queryset = super().get_queryset()
        
        # Отримуємо параметри
        ids_include = self.request.query_params.get("ids_include")
        ids_exclude = self.request.query_params.get("ids_exclude")

        # Якщо передано ids_include - повертаємо лише вибрані заявки
        if ids_include:
            selected_ids = [int(id) for id in ids_include.split(",") if id.isdigit()]
            queryset = queryset.filter(id__in=selected_ids)
        elif ids_include == "":  # Якщо параметр переданий, але пустий
            return queryset.none()

        # Якщо передано ids_exclude - виключаємо ці заявки
        if ids_exclude:
            excluded_ids = [int(id) for id in ids_exclude.split(",") if id.isdigit()]
            queryset = queryset.exclude(id__in=excluded_ids)

        # Фільтрація за активністю
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            if is_active.lower() == 'true':
                logger.info("Filtering by active requests only.")
                queryset = queryset.filter(is_active=True)
            else:
                logger.info("Showing all requests, including inactive.")

        # Фільтрація за датами
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        logger.info(f"Received start_date: {start_date}, end_date: {end_date}")

        if start_date or end_date:
            try:
                if start_date:
                    start_date = make_aware(datetime.strptime(start_date, "%Y-%m-%d %H:%M:%S"))
                    logger.info(f"Parsed start_date: {start_date}")
                if end_date:
                    end_date = make_aware(datetime.strptime(end_date, "%Y-%m-%d %H:%M:%S"))
                    logger.info(f"Parsed end_date: {end_date}")
            except ValueError as e:
                logger.error(f"Invalid date format: {e}")
                return queryset.none()  # Повертаємо порожній набір, якщо формат дати неправильний

            if start_date and end_date:
                queryset = queryset.filter(
                    Q(departure_time__range=(start_date, end_date)) |
                    Q(arrival_time__range=(start_date, end_date))
                )
                logger.info(f"Filtered by date range: {start_date} to {end_date}")
            elif start_date:
                queryset = queryset.filter(departure_time__gte=start_date)
                logger.info(f"Filtered by start_date >= {start_date}")
            elif end_date:
                queryset = queryset.filter(arrival_time__lte=end_date)
                logger.info(f"Filtered by end_date <= {end_date}")

        # Фільтрація за напрямком
        direction = self.request.query_params.get('direction')
        if direction:
            directions = direction.split(',')
            if len(directions) == 2 and 'HOME_TO_WORK' in directions and 'WORK_TO_HOME' in directions:
                logger.info("Both directions selected. Removing direction filter.")
            else:
                logger.info(f"Filtering by directions: {directions}")
                queryset = queryset.filter(direction__in=directions)

        # Пошук
        search_query = self.request.query_params.get('search')
        if search_query:
            logging.info(f"Search Query: {search_query}")
            queryset = queryset.filter(
                Q(passenger__first_name__icontains=search_query) |
                Q(passenger__last_name__icontains=search_query) |
                Q(comment__icontains=search_query)
            )

        # ✅ Фільтрація за включенням у список або маршрут
        included_in_list = self.request.query_params.get('included_in_list')
        included_in_route = self.request.query_params.get('included_in_route')
        ordered_list_id = self.request.query_params.get('ordered_list_id')
        route_id = self.request.query_params.get('route_id')

        if included_in_list == "false":
            queryset = queryset.filter(ordered_list_id__isnull=True)
            logger.info("Filtering out requests that are already in a list.")

        if included_in_route == "false":
            queryset = queryset.filter(route_id__isnull=True)
            logger.info("Filtering out requests that are already in a route.")

        if ordered_list_id:
            queryset = queryset.filter(ordered_list_id=ordered_list_id)
            logger.info(f"Filtering by specific ordered_list_id: {ordered_list_id}")

        if route_id:
            queryset = queryset.filter(route_id=route_id)
            logger.info(f"Filtering by specific route_id: {route_id}")

        logging.info(f"Final Queryset Count: {queryset.count()}")
        return queryset


class PassengerTripRequestCreateView(CreateAPIView):
    queryset = PassengerTripRequest.objects.all()
    serializer_class = PassengerTripRequestCreateSerializer

    def create(self, request, *args, **kwargs):
        logger.info(f"Received data for creating a trip request: {request.data}")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        logger.info(f"Successfully created trip request: {serializer.data}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()


@api_view(['PATCH'])
def update_trip_request_status(request, pk):
    try:
        trip_request = PassengerTripRequest.objects.get(pk=pk)
        is_active = request.data.get('is_active', None)
        if is_active is not None:
            trip_request.is_active = is_active
            trip_request.save()
            status_text = "activated" if is_active else "deactivated"
            return Response({"detail": f"Trip request successfully {status_text}."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid 'is_active' value."}, status=status.HTTP_400_BAD_REQUEST)
    except PassengerTripRequest.DoesNotExist:
        return Response({"detail": "Trip request not found."}, status=status.HTTP_404_NOT_FOUND)


import logging
from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import OrderedPassengerList, PassengerTripRequest
from .serializers import OrderedPassengerListSerializer

# Ініціалізація логування
logger = logging.getLogger(__name__)

class OrderedPassengerListFilter(django_filters.FilterSet):
    ordered_list_id = django_filters.NumberFilter(field_name="trip_requests__ordered_list_id")
    sequence_number = django_filters.NumberFilter(field_name="trip_requests__sequence_number")
    included_in_list = django_filters.BooleanFilter(field_name="trip_requests__included_in_list")
    included_in_route = django_filters.BooleanFilter(field_name="trip_requests__included_in_route")
    included_in_trip = django_filters.BooleanFilter(field_name="trip_requests__included_in_trip")
    pickup_time_in_route = django_filters.DateTimeFilter(field_name="trip_requests__pickup_time_in_route")
    dropoff_time_in_route = django_filters.DateTimeFilter(field_name="trip_requests__dropoff_time_in_route")

    class Meta:
        model = OrderedPassengerList
        fields = [
            'start_city', 'end_city', 'direction', 'estimated_start_time',
            'estimated_end_time', 'passenger_count', 'stop_count', 'route_distance_km', 'is_active'
        ]

class OrderedPassengerListViewSet(viewsets.ModelViewSet):
    queryset = OrderedPassengerList.objects.prefetch_related('trip_requests')
    serializer_class = OrderedPassengerListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = OrderedPassengerListFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request

        start_time = request.GET.get("estimated_start_time__gte")
        end_time = request.GET.get("estimated_end_time__lte")

        logger.info(f"📌 Фільтрація за датами: start_time={start_time}, end_time={end_time}")

        if start_time and end_time:
            queryset = queryset.filter(
                estimated_start_time__gte=start_time,
                estimated_end_time__lte=end_time
            )

        return queryset

    filterset_fields = {
        'direction': ['exact'],
        'is_active': ['exact'],
        'assigned_route_id': ['exact'],
        'estimated_start_time': ['gte', 'lte'],
        'estimated_end_time': ['gte', 'lte'],
        'passenger_count': ['gte', 'lte'],
        'start_city': ['icontains'],
        'end_city': ['icontains'],
        'start_passenger_last_name': ['icontains'],
        'end_passenger_last_name': ['icontains'],
        'ordered_list_id': ['exact'],
        'sequence_number': ['gte', 'lte'],
        'included_in_list': ['exact'],
        'included_in_route': ['exact'],
        'included_in_trip': ['exact'],
        'pickup_time_in_route': ['gte', 'lte'],
        'dropoff_time_in_route': ['gte', 'lte'],
    }
    search_fields = ['start_passenger_first_name', 'start_passenger_last_name',
                     'end_passenger_first_name', 'end_passenger_last_name', 'start_city', 'end_city']
    ordering_fields = ['created_at', 'estimated_start_time']

    @action(detail=False, methods=['post'])
    def create_ordered_list(self, request):
        """
        Створює новий запис у OrderedPassengerList та оновлює заявки у PassengerTripRequest.
        Всі операції виконуються у межах транзакції.
        """
        logger.info("Отриманий запит: %s", request.data)

        data = request.data
        selected_requests = data.get("selected_requests", [])

        if not selected_requests:
            logger.warning("Список заявок порожній.")
            return Response({"error": "No requests selected"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                estimated_start_time = make_aware(
                    datetime.strptime(data.get("estimated_start_time"), "%Y-%m-%d %H:%M:%S"))
                estimated_end_time = make_aware(
                    datetime.strptime(data.get("estimated_end_time"), "%Y-%m-%d %H:%M:%S"))

                logger.info("📌 Створення списку з параметрами: direction=%s, start_time=%s, end_time=%s",
                            data.get("direction"), estimated_start_time, estimated_end_time)

                # 🔍 Додатковий лог перед створенням списку
                logger.info("📌 Координати початкової точки: lat=%s, lon=%s",
                            data.get("start_latitude"), data.get("start_longitude"))

                # 🔴 Переконаємося, що всі обов’язкові поля є
                required_fields = ["start_latitude", "start_longitude", "end_latitude", "end_longitude"]
                # ✅ Створення нового списку у OrderedPassengerList
                ordered_list = OrderedPassengerList.objects.create(
                    direction=data.get("direction"),
                    estimated_start_time=estimated_start_time,
                    estimated_end_time=estimated_end_time,
                    estimated_travel_time=data.get("estimated_travel_time", 0),
                    estimated_wait_time=data.get("estimated_wait_time", 10),
                    has_both_directions=bool(data.get("has_both_directions")),
                    route_distance_km=data.get("route_distance_km", 0),
                    stop_count=data.get("stop_count", 0),
                    passenger_count=data.get("passenger_count", 0),
                    multiple_work_addresses_allowed=bool(data.get("multiple_work_addresses_allowed")),
                    is_active=bool(data.get("is_active")),
                    allow_copy=bool(data.get("allow_copy")),
                    allow_edit=bool(data.get("allow_edit")),

                    start_city=data.get("start_city"),
                    start_street=data.get("start_street"),
                    start_building=data.get("start_building", ""),
                    start_latitude=float(data.get("start_latitude")),
                    start_longitude=float(data.get("start_longitude")),
                    start_passenger_first_name=data.get("start_passenger_first_name"),
                    start_passenger_last_name=data.get("start_passenger_last_name"),
                    start_passenger_id=data.get("start_passenger_id"),
                    start_address_type=data.get("start_address_type"),
                    start_coordinate_id=data.get("start_coordinate_id"),
                    start_request_id=data.get("start_request_id"),

                    end_city=data.get("end_city"),
                    end_street=data.get("end_street"),
                    end_building=data.get("end_building", ""),
                    end_latitude=float(data.get("end_latitude")),
                    end_longitude=float(data.get("end_longitude")),
                    end_passenger_first_name=data.get("end_passenger_first_name"),
                    end_passenger_last_name=data.get("end_passenger_last_name"),
                    end_passenger_id=data.get("end_passenger_id"),
                    end_address_type=data.get("end_address_type"),
                    end_coordinate_id=data.get("end_coordinate_id"),
                    end_request_id=data.get("end_request_id"),
                )
                logger.info("Список успішно створено з ID: %s", ordered_list.id)

                # 🔄 Оновлення заявок
                passenger_requests = []
                for index, request_id in enumerate(selected_requests):
                    try:
                        passenger_request = PassengerTripRequest.objects.get(id=request_id["id"])

                        # 🔎 Перевіряємо чи є координати
                        if not passenger_request.pickup_latitude or not passenger_request.pickup_longitude:
                            logger.error(f"Заявка ID {request_id['id']} не має координат!")
                            continue  # Пропускаємо таку заявку

                        passenger_request.ordered_list = ordered_list
                        passenger_request.sequence_number = request_id["sequence_number"]
                        passenger_request.included_in_list = True
                        passenger_requests.append(passenger_request)

                        logger.info("Оновлено заявку ID: %s, список ID: %s, номер: %s",
                                    request_id["id"], ordered_list.id, request_id["sequence_number"])

                    except PassengerTripRequest.DoesNotExist:
                        logger.error(f"Заявка ID {request_id['id']} не знайдена!")

                # Масове оновлення
                PassengerTripRequest.objects.bulk_update(
                    passenger_requests, ["ordered_list", "sequence_number", "included_in_list"]
                )

                logger.info("Успішне оновлення %s заявок", len(passenger_requests))

                return Response(
                    {"message": "List created successfully", "list_id": ordered_list.id},
                    status=status.HTTP_201_CREATED,
                )

        except Exception as e:
            logger.error("Помилка під час створення списку: %s", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FilteredOrderedPassengerListView(ListAPIView):
    queryset = OrderedPassengerList.objects.all()
    serializer_class = OrderedPassengerListSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]

    # Фільтрація з додатковими параметрами
    filterset_fields = {
        'direction': ['exact'],
        'is_active': ['exact'],
        'assigned_route_id': ['exact'],
        'created_at': ['gte', 'lte'],
        'estimated_start_time': ['gte', 'lte'],
        'estimated_end_time': ['gte', 'lte'],
        'passenger_count': ['gte', 'lte'],
        'start_city': ['icontains'],
        'end_city': ['icontains'],
        'start_passenger_last_name': ['icontains'],
        'end_passenger_last_name': ['icontains'],
        'ordered_list_id': ['exact'],  # Фільтрація за номером списку
        'sequence_number': ['gte', 'lte'],  # Фільтр за порядковим номером
        'included_in_list': ['exact'],
        'included_in_route': ['exact'],
        'included_in_trip': ['exact'],
        'pickup_time_in_route': ['gte', 'lte'],
        'dropoff_time_in_route': ['gte', 'lte'],
    }

    # Поля, за якими можна виконувати пошук
    search_fields = ['start_passenger_first_name', 'start_passenger_last_name',
                     'end_passenger_first_name', 'end_passenger_last_name',
                     'start_city', 'end_city']

    # Поля, за якими можна сортувати
    ordering_fields = ['created_at', 'estimated_start_time', 'estimated_end_time']


@api_view(["DELETE"])
def delete_ordered_list(request, list_id):
    """
    Видаляє список пасажирів і очищує прив'язані заявки.
    """
    try:
        # Знайти всі заявки, які були включені в цей список
        passenger_requests = PassengerTripRequest.objects.filter(ordered_list_id=list_id)

        # Оновити заявки (очистити список)
        passenger_requests.update(
            ordered_list_id=None,
            included_in_list=0,
            sequence_number=None
        )

        # Видалити список пасажирів
        ordered_list = OrderedPassengerList.objects.filter(id=list_id)
        if not ordered_list.exists():
            return Response({"error": "Список не знайдено"}, status=status.HTTP_404_NOT_FOUND)

        ordered_list.delete()

        return Response({"message": f"Список {list_id} успішно видалено"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TemporaryPassengerListViewSet(viewsets.ModelViewSet):
    """
    API для управління тимчасовими списками пасажирів.
    """
    queryset = TemporaryPassengerList.objects.all()
    serializer_class = TemporaryPassengerListSerializer

    def get_queryset(self):
        """
        Повертає тільки списки, які належать поточному користувачу.
        """
        return TemporaryPassengerList.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def get_active_list(self, request):
        """
        Отримання активного тимчасового списку пасажирів для користувача.
        Якщо список відсутній, повертаємо порожній об'єкт без помилки.
        """
        user = request.user
        session_id = request.headers.get('Session-ID')  # Отримуємо session_id з заголовків

        print(f"🔍 Перевіряємо тимчасовий список для user={user} (ID: {user.id}), session_id={session_id}")

        if not session_id:
            return Response({"message": "Session ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session_id = UUID(session_id)  # Перетворюємо рядок у UUID
        except ValueError:
            return Response({"message": "Invalid session_id format"}, status=status.HTTP_400_BAD_REQUEST)

        instance = TemporaryPassengerList.objects.filter(
            user=user, session_id=session_id, expires_at__gt=now()
        ).first()

        if instance:
            # Перевіряємо, чи є в списку заявки, які вже включені в постійний список
            stored_requests = instance.requests  # Заявки у тимчасовому списку
            conflicting_requests = PassengerTripRequest.objects.filter(id__in=stored_requests, included_in_list=True)

            if conflicting_requests.exists():
                # Видаляємо тимчасовий список, бо він втратив актуальність
                instance.delete()
                return Response({"message": "Тимчасовий список втратив актуальність"}, status=status.HTTP_410_GONE)

            return Response(TemporaryPassengerListSerializer(instance).data, status=status.HTTP_200_OK)

        # Якщо запису немає в БД, повертаємо порожній список фільтрів замість помилки
        print("⚠️ Тимчасовий список не знайдено, повертаємо порожній результат.")
        return Response({"filter_params": {}}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def save_list(self, request):
        """
        Збереження тимчасового списку пасажирів.
        """
        data = request.data
        expires_at = data.get("expires_at")

        if not expires_at:
            expires_at = (now() + timedelta(hours=24)).isoformat()  # Якщо немає, додаємо +24 години

        instance, created = TemporaryPassengerList.objects.update_or_create(
            user=request.user,
            session_id=data.get("session_id"),
            defaults={
                "filter_params": data.get("filter_params"),
                "requests": data.get("requests") or [],
                "last_modified": now(),
                "expires_at": expires_at,  # ✅ Додаємо оновлення expires_at
            }
        )

        return Response(TemporaryPassengerListSerializer(instance).data,
                        status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def finalize_list(self, request):
        """
        Фіналізація маршруту та перенесення у підтверджені маршрути.
        """
        session_id = request.data.get("session_id")
        instance = TemporaryPassengerList.objects.filter(user=request.user, session_id=session_id).first()

        if instance:
            # 🚀 Тут буде логіка перенесення списку у `confirmed_passenger_lists`
            instance.delete()
            return Response({"message": "List finalized and moved to confirmed routes"}, status=status.HTTP_200_OK)

        return Response({"message": "List not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_expired_lists(request):
    """Видаляє всі тимчасові списки, термін яких закінчився"""
    expired_lists = TemporaryPassengerList.objects.filter(expires_at__lt=now())
    count = expired_lists.count()
    expired_lists.delete()
    return Response({"message": f"Deleted {count} expired temporary passenger lists."})

@api_view(['GET'])
def get_available_passenger_requests(request):
    """
    Отримання списку доступних заявок (тільки ті, які ще не включені в постійний список).
    """
    available_requests = OrderedPassengerList.objects.filter(included_in_list=False)
    serializer = OrderedPassengerListSerializer(available_requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
def get_passenger_requests_details(request):
    """Отримання повної інформації про заявки за списком ID"""
    request_ids = request.data.get("request_ids", [])

    if not request_ids:
        return Response({"error": "Немає переданих ID заявок"}, status=status.HTTP_400_BAD_REQUEST)

    # Отримуємо заявки по їх ID
    passenger_requests = PassengerTripRequest.objects.filter(id__in=request_ids)

    # Перевіряємо, чи є заявки, що вже включені у маршрут
    if passenger_requests.filter(included_in_list=True).exists():
        return Response({"error": "Список не актуальний"}, status=status.HTTP_409_CONFLICT)

    # Відправляємо дані у вигляді списку
    return Response(PassengerTripRequestSerializer(passenger_requests, many=True).data, status=status.HTTP_200_OK)
