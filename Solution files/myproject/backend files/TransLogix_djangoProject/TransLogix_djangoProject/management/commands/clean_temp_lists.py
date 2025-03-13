from django.core.management.base import BaseCommand
from django.utils.timezone import now
from TransLogix_djangoProject.models import TemporaryPassengerList

class Command(BaseCommand):
    help = "Видаляє старі тимчасові списки пасажирів"

    def handle(self, *args, **kwargs):
        expired_lists = TemporaryPassengerList.objects.filter(expires_at__lt=now())
        count = expired_lists.count()
        expired_lists.delete()
        self.stdout.write(f"Deleted {count} expired temporary passenger lists.")
