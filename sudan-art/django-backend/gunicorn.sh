if [ "DJANGO_SETTINGS_MODULE" == "django_backend.dev_settings" ]
then
    gunicorn --bind :8000 --workers 4 --reload django_backend.wsgi:application
else
    gunicorn --bind :8000 --workers 4 django_backend.wsgi:application
fi
