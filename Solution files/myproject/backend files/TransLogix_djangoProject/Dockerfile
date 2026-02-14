FROM python:3.11-slim

WORKDIR /app

# системні залежності (потрібно для mysqlclient/psycopg2, pillow тощо)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# collectstatic не обов'язково зараз; можна увімкнути пізніше
# RUN python manage.py collectstatic --noinput

EXPOSE 8000

# ⚠️ тут може треба змінити назву модуля wsgi
CMD ["gunicorn", "TransLogix_djangoProject.wsgi:application", "--bind", "0.0.0.0:8000"]
