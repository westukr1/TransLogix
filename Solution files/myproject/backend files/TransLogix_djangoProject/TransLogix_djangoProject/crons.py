from django_cron import CronJobBase, Schedule
from django.utils.timezone import now
from .models import TemporaryPassengerList

class DeleteExpiredListsCronJob(CronJobBase):
    RUN_EVERY_MINS = 1440  # Раз на 24 години

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'TransLogix_djangoProject.delete_expired_lists'

    def do(self):
        expired_lists = TemporaryPassengerList.objects.filter(expires_at__lt=now())
        count = expired_lists.count()
        expired_lists.delete()
        print(f"Deleted {count} expired temporary passenger lists.")
