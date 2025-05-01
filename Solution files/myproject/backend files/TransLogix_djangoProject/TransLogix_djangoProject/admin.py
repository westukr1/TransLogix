from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .models import OrderedPassengerList
from .models import RoutePlanDraft, RouteDraftList

class CustomUserAdmin(UserAdmin):  # Кастомний UserAdmin для стандартної моделі User
    model = User

    # Додаємо нові поля до fieldsets
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_logistic_operator', 'is_financial_manager', 'is_admin', 'is_blocked')}),  # Додаємо ваші поля
    )

    # Відображення полів у списку користувачів в адмінці
    list_display = ('username', 'email', 'is_logistic_operator', 'is_financial_manager', 'is_admin', 'is_blocked')

    # Додаємо поля для фільтрації в адмінці
    list_filter = ('is_logistic_operator', 'is_financial_manager', 'is_admin', 'is_blocked')

# Скасовуємо реєстрацію стандартного UserAdmin
#admin.site.unregister(User)

# Реєструємо кастомний UserAdmin для стандартної моделі User
admin.site.register(User, CustomUserAdmin)
admin.site.register(RoutePlanDraft)
admin.site.register(RouteDraftList)

@admin.register(OrderedPassengerList)
class OrderedPassengerListAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_start_passenger', 'get_end_passenger', 'direction', 'is_active')
    search_fields = ('start_passenger_first_name', 'start_passenger_last_name', 'end_passenger_first_name', 'end_passenger_last_name')
    list_filter = ('direction', 'is_active')

    def get_start_passenger(self, obj):
        return f"{obj.start_passenger_first_name} {obj.start_passenger_last_name}"
    get_start_passenger.short_description = "Перший пасажир"

    def get_end_passenger(self, obj):
        return f"{obj.end_passenger_first_name} {obj.end_passenger_last_name}"
    get_end_passenger.short_description = "Останній пасажир"