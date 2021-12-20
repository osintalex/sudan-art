FROM python:3.10-slim-buster

RUN apt-get update
# Add dependcies for pyscopg2, which django uses to connect to postgres sql database
RUN apt-get install -y --no-install-recommends libpq-dev gcc python3-dev
# Remove all the unecessary packages installed by the update command
RUN rm -rf /var/lib/apt/lists/*
RUN pip install --upgrade pip
RUN adduser --disabled-login worker
USER worker
WORKDIR /home/worker/app/django-backend
## Set working directory for django project
#WORKDIR /app/django-backend
# Install python packages
COPY --chown=worker:worker requirements.txt requirements.txt
RUN pip install -r requirements.txt
ENV PATH="/home/worker/.local/bin:${PATH}"
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]