from rest_framework import serializers

from .models import User, Route, CoordinatePoint, House, Driver, Vehicle
from .models import  Country, Region, City, District, Street
from .models import DriverVehicleAssignment, FuelType
from .models import Passenger, PassengerTripRequest,OrderedPassengerList



class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    is_logistic_operator = serializers.BooleanField(required=False)
    is_financial_manager = serializers.BooleanField(required=False)
    is_admin = serializers.BooleanField(required=False)
    is_blocked = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'confirm_password',
            'first_name',
            'last_name',
            'is_logistic_operator',
            'is_financial_manager',
            'is_admin',
            'is_staff',
            'is_superuser',
            'is_blocked'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        # Оновлюємо ролі користувача
        user.is_logistic_operator = validated_data.get('is_logistic_operator', False)
        user.is_financial_manager = validated_data.get('is_financial_manager', False)
        user.is_admin = validated_data.get('is_admin', False)
        user.is_blocked = validated_data.get('is_blocked', False)  # Додаємо перевірку статусу блокування

        user.save()
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        # Оновлюємо ролі користувача
        instance.is_logistic_operator = validated_data.get('is_logistic_operator', instance.is_logistic_operator)
        instance.is_financial_manager = validated_data.get('is_financial_manager', instance.is_financial_manager)
        instance.is_admin = validated_data.get('is_admin', instance.is_admin)
        instance.is_blocked = validated_data.get('is_blocked', instance.is_blocked)

        # Перевіряємо, чи потрібно змінити пароль
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

class RouteSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")  # Формат для дати і часу
    distance = serializers.DecimalField(max_digits=6, decimal_places=2, required=False, allow_null=True)
    estimated_time = serializers.IntegerField(required=False, allow_null=True)  # Час у хвилинах
    route_number = serializers.CharField(read_only=True)  # Номер маршруту
    origin_city = serializers.SerializerMethodField()
    origin_region = serializers.SerializerMethodField()
    origin_district = serializers.SerializerMethodField()
    origin_street = serializers.SerializerMethodField()
    origin_house = serializers.SerializerMethodField()

    destination_city = serializers.SerializerMethodField()
    destination_region = serializers.SerializerMethodField()
    destination_district = serializers.SerializerMethodField()
    destination_street = serializers.SerializerMethodField()
    destination_house = serializers.SerializerMethodField()

    start_point = serializers.SerializerMethodField()  # Коригуємо на ручне управління через метод
    end_point = serializers.SerializerMethodField()

    class Meta:
        model = Route
        fields = ['route_number',
                  'distance',
                  'estimated_time',
                  'date',
                  'origin_city',
                  'origin_region',
                  'origin_district',
                  'origin_street',
                  'origin_house',
                  'destination_city',
                  'destination_region',
                  'destination_district',
                  'destination_street',
                  'destination_house',
                  'start_point',
                  'end_point'
                  ]

    def get_origin_city(self, obj):
        return obj.start_point.city.name if obj.start_point and obj.start_point.city else None

    def get_origin_region(self, obj):
        return obj.start_point.region.name if obj.start_point and obj.start_point.region else None

    def get_origin_district(self, obj):
        return obj.start_point.district.name if obj.start_point and obj.start_point.district else None

    def get_origin_street(self, obj):
        return obj.start_point.street.name if obj.start_point and obj.start_point.street else None

    def get_origin_house(self, obj):
        # Access house number from the House instance
        return obj.start_point.house.house_number if obj.start_point and obj.start_point.house else None

    def get_destination_city(self, obj):
        return obj.end_point.city.name if obj.end_point and obj.end_point.city else None

    def get_destination_region(self, obj):
        return obj.end_point.region.name if obj.end_point and obj.end_point.region else None

    def get_destination_district(self, obj):
        return obj.end_point.district.name if obj.end_point and obj.end_point.district else None

    def get_destination_street(self, obj):
        return obj.end_point.street.name if obj.end_point and obj.end_point.street else None

    def get_destination_house(self, obj):
        # Access house number from the House instance
        return obj.end_point.house.house_number if obj.end_point and obj.end_point.house else None

    def get_start_point(self, obj):
        # Якщо хочете окремо відобразити точку старту
        return {
            'latitude': obj.start_point.latitude,
            'longitude': obj.start_point.longitude,
            'city': obj.start_point.city.name if obj.start_point and obj.start_point.city else None,
            'region': obj.start_point.region.name if obj.start_point and obj.start_point.region else None,
            'district': obj.start_point.district.name if obj.start_point and obj.start_point.district else None,
            'street': obj.start_point.street.name if obj.start_point and obj.start_point.street else None,
            'house_number': obj.start_point.house.house_number if obj.start_point and obj.start_point.house else None
        } if obj.start_point else None

    def get_end_point(self, obj):
        # Якщо хочете окремо відобразити точку кінця
        return {
            'latitude': obj.end_point.latitude,
            'longitude': obj.end_point.longitude,

            'city': obj.end_point.city.name if obj.end_point and obj.end_point.city else None,
            'region': obj.end_point.region.name if obj.end_point and obj.end_point.region else None,
            'district': obj.end_point.district.name if obj.end_point and obj.end_point.district else None,
            'street': obj.end_point.street.name if obj.end_point and obj.end_point.street else None,
            'house_number': obj.end_point.house.house_number if obj.end_point and obj.end_point.house else None
        } if obj.end_point else None

class CoordinatePointSerializer(serializers.ModelSerializer):
    country = serializers.CharField(required=False)  # Залишаємо як `CharField`
    region = serializers.CharField(required=False)
    district = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    street = serializers.CharField(required=False)
    house_number = serializers.SerializerMethodField()
    point_type = serializers.CharField(required=False)
    owner_first_name = serializers.SerializerMethodField()
    owner_last_name = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()
    owner_type = serializers.CharField(default='passenger')
    is_active = serializers.BooleanField(default=True)

    def validate_latitude(self, value):
        return round(value, 6)

    def validate_longitude(self, value):
        return round(value, 6)

    class Meta:
        model = CoordinatePoint
        fields = [
            'id',
            'point_type',
            'latitude',
            'longitude',
            'house_number',
            'city',
            'region',
            'district',
            'country',
            'street',
            'owner_type',
            'owner_id',
            'owner_first_name',
            'owner_last_name',
            'is_active'
        ]

    def get_owner_id(self, obj):
        if obj.owner_id:
            return obj.owner_id
        return None

    def get_owner_first_name(self, obj):
        if obj.owner_type == 'passenger' and obj.owner_id:
            try:
                passenger = Passenger.objects.get(id=obj.owner_id)
                return passenger.first_name
            except Passenger.DoesNotExist:
                return None
        return None

    def get_owner_last_name(self, obj):
        if obj.owner_type == 'passenger' and obj.owner_id:
            try:
                passenger = Passenger.objects.get(id=obj.owner_id)
                return passenger.last_name
            except Passenger.DoesNotExist:
                return None
        return None

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)

        # Перевіряємо, чи `country` є рядком, і перетворюємо його в об'єкт
        country_value = data.get('country')
        if country_value and isinstance(country_value, str):
            try:
                country_obj = Country.objects.get(name=country_value)
                internal_data['country'] = country_obj
            except Country.DoesNotExist:
                raise serializers.ValidationError({'country': f'Country "{country_value}" does not exist.'})
        elif isinstance(country_value, int):
            try:
                country_obj = Country.objects.get(id=country_value)
                internal_data['country'] = country_obj
            except Country.DoesNotExist:
                raise serializers.ValidationError({'country': f'Country with id "{country_value}" does not exist.'})

        return internal_data

    def get_house_number(self, obj):
        return obj.house.house_number if obj.house else None

    def create(self, validated_data):
        country = validated_data.pop('country', None)
        region = validated_data.pop('region', None)
        district = validated_data.pop('district', None)
        city = validated_data.pop('city', None)
        street = validated_data.pop('street', None)
        house_number = validated_data.pop('house_number', None)

        country_obj = Country.objects.get_or_create(name=country)[0] if country else None
        region_obj = Region.objects.get_or_create(name=region, country=country_obj)[0] if region else None
        district_obj = District.objects.get_or_create(name=district, region=region_obj)[0] if district else None
        city_obj = City.objects.get_or_create(name=city, district=district_obj)[0] if city else None
        street_obj = Street.objects.get_or_create(name=street, city=city_obj)[0] if street else None

        house_instance = None
        if house_number and street_obj:
            house_instance, _ = House.objects.get_or_create(street=street_obj, house_number=house_number)

        coordinate_point = CoordinatePoint.objects.create(
            latitude=round(validated_data['latitude'], 6),
            longitude=round(validated_data['longitude'], 6),
            house=house_instance,
            country=country_obj,
            region=region_obj,
            district=district_obj,
            city=city_obj,
            street=street_obj,
            **validated_data
        )
        return coordinate_point

    def update(self, instance, validated_data):
        if 'latitude' in validated_data:
            instance.latitude = round(validated_data['latitude'], 6)
        if 'longitude' in validated_data:
            instance.longitude = round(validated_data['longitude'], 6)
        if 'country' in validated_data:
            instance.country = validated_data['country']
        if 'region' in validated_data:
            instance.region = validated_data['region']
        if 'city' in validated_data:
            instance.city = validated_data['city']
        if 'street' in validated_data:
            instance.street = validated_data['street']
        if 'district' in validated_data:
            instance.district = validated_data['district']
        instance.save()
        return instance



class PassengerSerializer(serializers.ModelSerializer):
    pickup_addresses = CoordinatePointSerializer(many=True)
    dropoff_addresses = CoordinatePointSerializer(many=True, required=False)
    work_addresses = CoordinatePointSerializer(many=True, required=False)

    class Meta:
        model = Passenger
        fields = ['id',
                  'first_name',
                  'last_name',
                  'department',
                  'pickup_addresses',
                  'dropoff_addresses',
                  'work_addresses',
                  'phone_number',
                  'email']


    def create(self, validated_data):
        # Додаткові логування
        print(f"Вхідні дані для збереження пасажира: {validated_data}")
        # Дістаємо дані для адрес
        pickup_addresses_data = validated_data.pop('pickup_addresses')
        dropoff_addresses_data = validated_data.pop('dropoff_addresses', [])
        work_addresses_data = validated_data.pop('work_addresses', [])

        print(f"Pickup адреси: {pickup_addresses_data}")
        print(f"Dropoff адреси: {dropoff_addresses_data}")
        print(f"Work адреси: {work_addresses_data}")

        # Створюємо об'єкти для кожної адреси, якщо вони є
        try:
            # Create CoordinatePoints for each address type
            pickup_addresses = [CoordinatePoint.objects.create(**addr) for addr in pickup_addresses_data]
            dropoff_addresses = [CoordinatePoint.objects.create(**addr) for addr in dropoff_addresses_data]
            work_addresses = [CoordinatePoint.objects.create(**addr) for addr in work_addresses_data]

            print(f"Pickup адреси створено: {pickup_addresses}")
            print(f"Dropoff адреси створено: {dropoff_addresses}")
            print(f"Work адреси створено: {work_addresses}")
            # Створюємо пасажира з усіма адресами
            # Create the Passenger
            passenger = Passenger.objects.create(**validated_data)
            print(f"Пасажир створений: {passenger}")
            passenger.pickup_addresses.set(pickup_addresses)
            passenger.dropoff_addresses.set(dropoff_addresses)
            passenger.work_addresses.set(work_addresses)
            print(f"Адреси прив'язані до пасажира")
            return passenger
        except Exception as e:
            print(f"Сталася помилка при створенні пасажира: {str(e)}")
            raise e

def update(self, instance, validated_data):
    # Оновлюємо існуючі поля пасажира
    instance.first_name = validated_data.get('first_name', instance.first_name)
    instance.last_name = validated_data.get('last_name', instance.last_name)
    instance.department = validated_data.get('department', instance.department)
    instance.phone_number = validated_data.get('phone_number', instance.phone_number)
    instance.email = validated_data.get('email', instance.email)
    instance.save()

    # Оновлюємо точки адрес
    pickup_address_data = validated_data.pop('pickup_address', None)
    if pickup_address_data:
        for attr, value in pickup_address_data.items():
            setattr(instance.pickup_address, attr, value)
        instance.pickup_address.save()

    dropoff_address_data = validated_data.pop('dropoff_address', None)
    if dropoff_address_data:
        for attr, value in dropoff_address_data.items():
            setattr(instance.dropoff_address, attr, value)
        instance.dropoff_address.save()

    work_address_data = validated_data.pop('work_address', None)
    if work_address_data:
        for attr, value in work_address_data.items():
            setattr(instance.work_address, attr, value)
        instance.work_address.save()

    return instance

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'country']

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'region']


class PassengerListSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    region = serializers.SerializerMethodField()
    district = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    street = serializers.SerializerMethodField()
    house_number = serializers.SerializerMethodField()
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()

    class Meta:
        model = Passenger
        fields = ['id', 'first_name', 'last_name', 'department', 'phone_number', 'email',
                  'country', 'region', 'city', 'district','street', 'house_number', 'latitude', 'longitude', 'is_active',
                  'is_selected']

    def get_country(self, obj):
        pickup_address = obj.pickup_addresses.first()
        if pickup_address and pickup_address.country:
            return pickup_address.country.name
        return None

    def get_region(self, obj):
        pickup_address = obj.pickup_addresses.first()
        if pickup_address and pickup_address.region:
            return pickup_address.region.name
        return None
    def get_district(self, obj):
        pickup_address = obj.pickup_addresses.first()
        if pickup_address and pickup_address.district:
            return pickup_address.district.name
        return None
    def get_city(self, obj):
        pickup_address = obj.pickup_addresses.first()
        if pickup_address and pickup_address.city:
            return pickup_address.city.name
        return None

    def get_street(self, obj):
        pickup_address = obj.pickup_addresses.first()
        if pickup_address and pickup_address.street:
            return pickup_address.street.name
        return None

    def get_house_number(self, obj):
        pickup_address = obj.pickup_addresses.first()
        # Now accessing house_number through the related House instance
        return pickup_address.house.house_number if pickup_address and pickup_address.house else None

    def get_latitude(self, obj):
        pickup_address = obj.pickup_addresses.first()
        return pickup_address.latitude if pickup_address else None

    def get_longitude(self, obj):
        pickup_address = obj.pickup_addresses.first()
        return pickup_address.longitude if pickup_address else None


class PassengerDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passenger
        fields = ['id','first_name', 'last_name', 'department', 'phone_number', 'email', 'pickup_addresses',
                  'dropoff_addresses', 'work_addresses']

    def create(self, validated_data):
        # Пасажир створюється за допомогою validated_data
        return Passenger.objects.create(**validated_data)


from rest_framework import serializers
from .models import CoordinatePoint, Country, Region, District, City, Street, House


class CoordinatePointDetailSerializer(serializers.ModelSerializer):
    # Додаємо текстові значення замість `id`
    country = serializers.CharField(source='country.name', read_only=True)
    region = serializers.CharField(source='region.name', read_only=True)
    district = serializers.CharField(source='district.name', read_only=True)
    city = serializers.CharField(source='city.name', read_only=True)
    street = serializers.CharField(source='street.name', read_only=True)
    house_number = serializers.SerializerMethodField()  # Use SerializerMethodField to fetch from House

    # Додаємо поля для імені та прізвища власника
    owner_first_name = serializers.SerializerMethodField()
    owner_last_name = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()

    class Meta:
        model = CoordinatePoint
        fields = [
            'id', 'point_type', 'latitude', 'longitude', 'house_number',
            'country', 'region', 'district', 'city', 'street', 'owner_type',
            'owner_id', 'owner_first_name', 'owner_last_name', 'is_active', 'owner_id'
        ]

    def get_house_number(self, obj):
        # Fetching house_number from the related House instance if it exists
        return obj.house.house_number if obj.house else None

    def get_owner_first_name(self, obj):
        if obj.owner_type == 'passenger' and obj.owner_id:
            try:
                passenger = Passenger.objects.get(id=obj.owner_id)
                return passenger.first_name
            except Passenger.DoesNotExist:
                return None
        return None

    def get_owner_last_name(self, obj):
        if obj.owner_type == 'passenger' and obj.owner_id:
            try:
                passenger = Passenger.objects.get(id=obj.owner_id)
                return passenger.last_name
            except Passenger.DoesNotExist:
                return None
        return None

    def get_owner_id(self, obj):
        return obj.owner_id

class CoordinatePointCoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoordinatePoint
        fields = ['latitude', 'longitude']  # Тільки потрібні поля

    def update(self, instance, validated_data):
        # Оновлюємо лише широту та довготу
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.save()
        return instance

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = [
             'driver_id','last_name', 'first_name', 'middle_name', 'phone_number', 'email',
            'year_of_birth', 'citizenship', 'contract_type', 'residence_address',
            'registration_address', 'driving_experience', 'license_category', 'license_issuer', 'license_issue_date',
            'license_number', 'image_url','active'
        ]
class FuelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelType
        fields = ['fuel_type_id', 'type']
class VehicleSerializer(serializers.ModelSerializer):
    fuel_type = FuelTypeSerializer(read_only=True)
    fuel_type_id = serializers.PrimaryKeyRelatedField(
        queryset=FuelType.objects.all(),
        source='fuel_type',  # Зв’язок через ForeignKey
        write_only=True  # Для запису
    )

    class Meta:
        model = Vehicle
        fields = [
            'vehicle_id',
            'license_plate_format',
            'license_plate',
            'make',
            'model',
            'year',
            'engine_volume',
            'registered_to',
            'chassis_number',
            'city_fuel_consumption',
            'highway_fuel_consumption',
            'fuel_type',
            'fuel_type_id',
            'capacity',
            'image_url',
            'active',
        ]
        read_only_fields = ['vehicle_id']


    def validate_year(self, value):
        """Перевіряє, чи рік випуску не є більшим за поточний."""
        from datetime import date
        current_year = date.today().year
        if value > current_year:
            raise serializers.ValidationError("Year cannot be in the future.")
        return value

    def validate_capacity(self, value):
        """Перевіряє, чи місткість транспортного засобу є позитивною."""
        if value < 0:
            raise serializers.ValidationError("Capacity must be a positive number.")
        return value

    def validate_city_fuel_consumption(self, value):
        """Перевіряє, чи розхід палива в місті є коректним."""
        if value < 0:
            raise serializers.ValidationError("City fuel consumption cannot be negative.")
        return value

    def validate_highway_fuel_consumption(self, value):
        """Перевіряє, чи розхід палива на трасі є коректним."""
        if value < 0:
            raise serializers.ValidationError("Highway fuel consumption cannot be negative.")
        return value

class DriverVehicleAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverVehicleAssignment
        fields = '__all__'


class PassengerTripRequestSerializer(serializers.ModelSerializer):
    passenger_first_name = serializers.CharField(source='passenger.first_name', read_only=True)
    passenger_last_name = serializers.CharField(source='passenger.last_name', read_only=True)
    passenger_phone = serializers.CharField(source='passenger.phone_number', read_only=True)

    pickup_point_id = serializers.IntegerField(source='pickup_point.id', read_only=True)
    dropoff_point_id = serializers.IntegerField(source='dropoff_point.id', read_only=True)

    pickup_city = serializers.CharField(source='pickup_point.city.name', read_only=True)
    pickup_street = serializers.CharField(source='pickup_point.street.name', read_only=True)
    pickup_house = serializers.CharField(source='pickup_point.house.house_number', read_only=True)

    dropoff_city = serializers.CharField(source='dropoff_point.city.name', read_only=True)
    dropoff_street = serializers.CharField(source='dropoff_point.street.name', read_only=True)
    dropoff_house = serializers.CharField(source='dropoff_point.house.house_number', read_only=True)

    class Meta:
        model = PassengerTripRequest
        fields = [
            'id',
            'passenger',
            'passenger_first_name',
            'passenger_last_name',
            'passenger_phone',
            'direction',
            'departure_time',
            'arrival_time',
            'pickup_point_id',
            'dropoff_point_id',
            'pickup_city',
            'pickup_street',
            'pickup_house',
            'pickup_latitude',
            'pickup_longitude',
            'dropoff_city',
            'dropoff_street',
            'dropoff_house',
            'dropoff_latitude',
            'dropoff_longitude',
            'is_active',
            'comment',
            'created_at',
            'updated_at',
        ]



class PassengerTripRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassengerTripRequest
        fields = [
            'pickup_latitude', 'pickup_longitude',
            'dropoff_latitude', 'dropoff_longitude',
            'direction', 'is_active', 'comment',
            'dropoff_point', 'passenger', 'pickup_point',
            'arrival_time', 'departure_time'
        ]




class OrderedPassengerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderedPassengerList
        fields = '__all__'
