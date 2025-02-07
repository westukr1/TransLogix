import django_filters
from .models import OrderedPassengerList

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
