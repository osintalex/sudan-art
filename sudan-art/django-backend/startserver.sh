if  [ "${DJANGO_SETTINGS_MODULE}" = "django_backend.dev_settings" ]
then
    python manage.py runserver 0.0.0.0:8000
else
    gunicorn --bind :8000 --workers 4 django_backend.wsgi:application
fi
