"""
URL configuration for TransLogix_djangoProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# TransLogix_djangoProject/urls.py (основний файл, не у додатку (тест 7))

# TransLogix_djangoProject/urls.py
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomLoginView, CreateUserView, PassengerCreateView, PassengerAddressesView, \
    UpdatePassengerAddressesView, GetHouseNumberView, ToggleCoordinatePointActiveView, \
    HasPickupAddressView, UpdateCoordinatesView, DriverCreateView, DriverUpdateView, VehicleListCreateView, \
    VehicleRetrieveUpdateDestroyView, DriverListView
from .views import ChangePasswordView
from .views import UserProfileView  # Імпортуйте новий клас
from .views import ForgotPasswordView  # Імпортуємо новий View
from .views import send_test_email
from .views import forgot_password
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from django.urls import path, include
from .views import UserListView
from .views import update_users
from django.contrib.auth.models import User
from django.urls import path
from . import views
from .views import get_allowed_apps
from .views import (
    RouteListView,
    RouteDetailView,
    RouteByOrderedPassengerListView,
    PassengerTripRequestListView,
    PassengerTripRequestCreateView,
)
from .views import PassengerListView  # Додайте цей імпорт
from .views import CoordinatePointListView
from .views import verify_address

from .views import get_countries, get_regions, get_districts, verify_and_save_passenger
from .views import get_google_maps_key
from .views import CoordinatePointCreateView, PassengerCreateView
from .views import toggle_select_passenger
from .views import toggle_active_passenger
from .views import toggle_select_all_passengers
from .views import FilteredRouteListView, FilteredCoordinatePointsView
from .views import (CoordinatePointUpdateView,
                    get_assigned_drivers,
                    assign_driver, remove_driver, DriverDetailView,
                    AssignVehicleToDriverView, RemoveDriverVehicleAssignmentView)
from .views import (DriverVehicleAssignmentViewSet,
                    FuelTypeViewSet, AssignedVehiclesView,
                    update_fuel_type, calculate_route, PassengerTripRequestViewSet,
                    update_trip_request_status, delete_ordered_list)

from .views import PassengerTripRequestCreateView
from .views import FilteredPassengerTripRequestView, OrderedPassengerListViewSet, FilteredOrderedPassengerListView

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TemporaryPassengerListViewSet, delete_expired_lists
from .views import get_passenger_requests_details
from .views import RoutePlanDraftViewSet, RouteDraftListViewSet
from .views import optimize_routes_api
from .serializers import UserSettingsSerializer


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'driver-vehicle-assignments', DriverVehicleAssignmentViewSet, basename='driver-vehicle-assignment')
router.register(r'fuel-types', FuelTypeViewSet, basename='fuel-type')
#router.register(r"passenger-trip-requests", PassengerTripRequestViewSet)
router.register(r'ordered-passenger-list', OrderedPassengerListViewSet)
router.register(r'temporary-passenger-list', TemporaryPassengerListViewSet, basename="temporary_passenger_list")
router.register(r'temp-lists', TemporaryPassengerListViewSet, basename='temp-list')
router.register(r'route-plans', RoutePlanDraftViewSet, basename='routeplandraft')
router.register(r'route-lists', RouteDraftListViewSet, basename='routedraftlist')

# Для створення пасажира go fuck yourself
import logging
logger = logging.getLogger(__name__)
logger.info("Loaded URLs")

urlpatterns = [
    path('admin/', admin.site.urls),  # Вже існуючий маршрут
    path('api/auth/', include('rest_framework.urls')),  # Маршрут для аутентифікації
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT токен
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Оновлення JWT токену
    path('login/', CustomLoginView.as_view(), name='custom_login'),  # Маршрут для кастомного логіну

    # Новий маршрут для створення користувача
    path('api/users/', CreateUserView.as_view(), name='create_user'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('api/me/', UserProfileView.as_view(), name='user-profile'),
    path('api/forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),  # Маршрут для скидання пароля
    path('send-test-email/', send_test_email, name='send_test_email'),

    path('api/', include(router.urls)),  # Додаємо маршрути API з router
    path('api/user-list/', UserListView.as_view(), name='user-list'),  # Додаємо маршрут для отримання списку користувачів
    path('api/user-update/', update_users, name='user-update'),
    path('api/custom-login/', CustomLoginView.as_view(), name='custom_login'),
    path('api/getUserRoles/', views.get_user_roles, name='get_user_roles'),
    path('api/allowed-apps/', get_allowed_apps, name='allowed_apps'),
    path('api/routes/', RouteListView.as_view(), name='route-list'),  # Ендпоінт для отримання маршрутів
    path('api/routes/<int:route_id>/', RouteDetailView.as_view(), name='route-detail'),
    path(
        'api/routes/by-ordered-list/<int:list_id>/',
        RouteByOrderedPassengerListView.as_view(),
        name='route-by-ordered-list',
    ),
    path('api/passengers/', PassengerListView.as_view(), name='passenger-list'),  # Для списку пасажирів
    path('api/coordinate-points/', CoordinatePointListView.as_view(), name='coordinate-point-list'),
    path('verify-address/', verify_address, name='verify-address'),


    path('api/verify-address/', verify_address, name='verify-address'),
    path('api/countries/', get_countries, name='get_countries'),
    path('api/regions/<int:country_id>/', get_regions, name='get_regions'),
    path('api/districts/<int:region_id>/', get_districts, name='get_districts'),
    path('api/save-passenger/', verify_and_save_passenger, name='save-passenger'),
    path('api/google-maps-key/', get_google_maps_key, name='get_google_maps_key'),
    path('api/coordinate/create/', CoordinatePointCreateView.as_view(), name='coordinate-create'),
    path('api/passengers/create/', PassengerCreateView.as_view(), name='passenger-create'),  # Для створення пасажира
    path('api/passengers/<int:passenger_id>/toggle-select/', toggle_select_passenger, name='toggle_select_passenger'),
    path('api/passengers/<int:passenger_id>/toggle-active/', toggle_active_passenger, name='toggle-active-passenger'),
    path('api/passengers/toggle-select-all/', toggle_select_all_passengers, name='toggle_select_all_passengers'),
    path('api/filtered-routes/', FilteredRouteListView.as_view(), name='filtered-routes'),
    path('api/filtered-coordinates/', FilteredCoordinatePointsView.as_view(), name='filtered-coordinates'),
    path('api/passengers/', views.get_passengers, name='get_passengers'),
    path('api/passengers/<int:id>/update/', views.update_passenger, name='update_passenger'),
    path('api/passenger/<int:passenger_id>/addresses/', PassengerAddressesView.as_view(), name='passenger_addresses'),
    # path('api/passengers/<int:id>/', views.get_passenger, name='get_passenger'),
    path('api/passenger/<int:passenger_id>/addresses/update/', UpdatePassengerAddressesView.as_view(), name='update_passenger_addresses'),
    path('api/passengers/<int:passenger_id>/addresses/', PassengerAddressesView.as_view(),
         name='passenger_addresses_plural'),
    path('api/passengers/<int:passenger_id>/addresses/update/', UpdatePassengerAddressesView.as_view(),
         name='update_passenger_addresses_plural'),
    path('api/passengers/<int:id>/', views.get_passenger, name='get_passenger'),


    path('api/coordinate-point/<int:coordinate_point_id>/house-number/', GetHouseNumberView.as_view(), name='get_house_number'),
    path('api/coordinate-points/<int:id>/toggle-active/', ToggleCoordinatePointActiveView.as_view(), name='toggle-coordinate-active'),
    path('api/coordinate-points/<int:id>/', CoordinatePointUpdateView.as_view(), name='update-coordinate-point'),
    path('api/coordinate-points/<int:id>/update-coordinates/', UpdateCoordinatesView.as_view(), name='update-coordinates'),
    # path('api/passenger/<int:passenger_id>/addresses/', PassengerAddressesView.as_view(), name='passenger_addresses'),


    path('api/passengers/<int:passenger_id>/has-pickup-address/', HasPickupAddressView.as_view(), name='has-pickup-address'),
    path('drivers/create/', DriverCreateView.as_view(), name='driver-create'),
    path('drivers/update/<int:pk>/', DriverUpdateView.as_view(), name='driver-update'),
    path('api/drivers/', DriverListView.as_view(), name='driver-list'),
    path('api/drivers/bulk-update/', views.bulk_update_drivers, name='bulk-update-drivers'),
    path('api/drivers/<int:pk>/', DriverDetailView.as_view(), name='driver-detail'),
    path('drivers/<int:id>/vehicles/', AssignedVehiclesView.as_view(), name='driver-assigned-vehicles'),
    path('driver/<int:driver_id>/assign-vehicle/', AssignVehicleToDriverView.as_view(), name='assign-vehicle-to-driver'),

    path('vehicles/', VehicleListCreateView.as_view(), name='vehicle-list-create'),
    path('vehicles/<int:pk>/', VehicleRetrieveUpdateDestroyView.as_view(), name='vehicle-detail'),
    path('api/vehicles/', VehicleListCreateView.as_view(), name='vehicle-list'),
    path('api/vehicles/bulk-update/', views.bulk_update_vehicles, name='bulk-update-vehicles'),
    path('api/vehicles/update-fuel-type/', update_fuel_type, name='update-fuel-type'),
    path('vehicles/<int:vehicle_id>/drivers/', get_assigned_drivers, name='assigned-drivers'),
    path('api/vehicles/remove-assignment/', RemoveDriverVehicleAssignmentView.as_view(), name='remove-assignment'),

    path('vehicles/<int:vehicle_id>/assign-driver/', assign_driver, name='assign-driver'),
    path('vehicles/<int:vehicle_id>/remove-driver/', remove_driver, name='remove-driver'),
    path('vehicles/<int:vehicle_id>/assigned-drivers/', get_assigned_drivers, name='assigned-drivers'),

    path('api/passenger-trip-requests/', PassengerTripRequestListView.as_view(), name='passenger-trip-requests'),

    path('api/passenger-trip-requests/create/', PassengerTripRequestCreateView.as_view(), name='create-passenger-trip-request'),
    path('api/calculate-route/', calculate_route, name='calculate_route'),
    path('api/filtered-passenger-trip-requests/', FilteredPassengerTripRequestView.as_view(), name='filtered_passenger_trip_requests'),
    path(
        'api/passenger-trip-requests/<int:pk>/update-status/',
        update_trip_request_status,
        name='update-trip-request-status',
    ),

    path('api/get-settings/', views.get_settings, name='get_settings'),
    path('api/update-settings/', views.update_settings, name='update_settings'),

    path('', include(router.urls)),
    path('api/', include(router.urls)),  # CRUD
    path('api/ordered-passenger-list/filter/', FilteredOrderedPassengerListView.as_view(), name='filtered_ordered_passenger_list'),  # Фільтрація
    path('api/ordered-passenger-list/<int:list_id>/delete/', delete_ordered_list, name='delete_ordered_list'),
    path('api/', include(router.urls)),
    path('api/delete-expired-lists/', delete_expired_lists, name='delete_expired_lists'),

    path('api/', include(router.urls)),  # <-- Включає API маршрути
    path('api/passenger-requests/details/', get_passenger_requests_details, name='get_passenger_requests_details'),
    path('api/temp-lists/get_active_list/', TemporaryPassengerListViewSet.as_view({'get': 'get_active_list'}), name='get_active_list'),

    path('api/', include(router.urls)),
    path('api/optimize/', optimize_routes_api, name='optimize_routes'),
]

