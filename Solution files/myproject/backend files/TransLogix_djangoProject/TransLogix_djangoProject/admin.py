from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

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