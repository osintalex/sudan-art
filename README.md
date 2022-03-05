![forthebadge-creative-commons](https://forthebadge.com/images/badges/cc-0.svg)
[![forthebadge made-with-python](http://ForTheBadge.com/images/badges/made-with-python.svg)](https://www.python.org/)
![forthebadge made-with-javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

# Sudan Art - A Revolutionary Web App

> A website to help the anti-coup resistance movement in Sudan. See a work in progress
> [sudan-art.com](https://www.sudan-art.com).

![Landing](.img/landing.png)

## Table of contents

- [Background](#background)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contributing](#contributing)

## Background

This site was inspired by the Burmese website [Three Fingers](https://threefingers.org), used to support
the anti-coup resistance movement in Myanmar.

## Technologies

- Digital Ocean
- Docker

### Backend

- Python
- Django
- Django Rest Framework
- Django Storages
- CORS Headers

### Frontend

- Javascript
- React
- React testing library
- React Router
- Chakra UI

## Setup

1. Clone the github repository
2. Make sure you are on the dev branch; check this by running `cd sudan-art && git branch`
3. Create a file to contain all the environment variables for the app. Hit `touch env` to create the file
   in the root directory of the repository, the same directory you just ran `git branch` in.
4. Populate this file. You need the following values:

```
DJANGO_SECRET_KEY=<make your own secret key>
DJANGO_SETTINGS_MODULE=django_backend.dev_settings
```

4. Install docker and make sure it's running; follow the instructions [here](https://docs.docker.com/engine/install/).
5. Now from the root directory of the repository, run `docker-compose -f docker-compose-dev.yml --env-file env up --build -d`.
   This will take some time, so check there are no basic errors then go have a break
6. Run `docker ps -a` to get the id of the django container - it's also the number long id output by the command
   above
7. Run `docker exec -it <container id goes here> /bin/bash` to get a shell on the Django container
8. Run `python manage.py test sudan_art.tests` to run the test suite
9. Run `python manage.py makemigrations`
10. Run `python manage.py migrate`
11. Hit exit to quit your shell session on the Docker container
12. Navigate to `https://localhost:3000` to see the frontend of the site and `https://localhost:8000`
    to see the backend. The frontend can take a while to load so hit `docker logs <frontend container id>` to
    check what's going on if you're out of patience

## Contributing

Contributions of all kind are **very welcome** :heart_eyes: ! Please read the [guide](https://github.com/osintalex/sudan-art/blob/dev/CONTRIBUTING.MD)
to get started.
