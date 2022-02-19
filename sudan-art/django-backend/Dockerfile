FROM python:3.10-slim-buster

RUN apt-get update
# Add dependcies for pyscopg2, which django uses to connect to postgres sql database
RUN apt-get install -y --no-install-recommends libpq-dev gcc python3-dev
# Remove all the unecessary packages installed by the update command
RUN rm -rf /var/lib/apt/lists/*
# Add new user so we don't run as root
RUN adduser --disabled-login worker
USER worker
WORKDIR /home/worker/app/django-backend
COPY --chown=worker:worker ["django_backend/*.py", "django_backend/"]
COPY --chown=worker:worker ["sudan_art/", "sudan_art/"]
COPY --chown=worker:worker ["manage.py", "requirements.txt", "startserver.sh", "./"]
ENV PATH="/home/worker/.local/bin:${PATH}"
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN chmod +x startserver.sh
RUN chmod 777 startserver.sh
EXPOSE 8000
CMD ./startserver.sh