---
title: "Django"
date: 2023-12-08
categories: ["django"]
---


## setup

### pipenv

  1. To include in project folder, first create .venv folder at project root

          mkdir .venv

  2. pip install pipenv (otherwise, it will load environment into ~ c: user profile)

          pip install pipenv

  3. run

          pipenv shell

### django

    pipenv install django

  create project in folder, creates config in root directory (use dot)

    django-admin startproject config .

### packages

#### main

- django

- [Pillow](https://pillow.readthedocs.io/en/stable/) (for file uplaods)

        pipenv install pillow

- [WhiteNoise](http://whitenoise.evans.io/en/stable/) (for serving files)

        pipenv install whitenoise

    add to settings.py

        "whitenoise.runserver_nostatic",  (add to INSTALLED_APPS after django apps)
        "whitenoise.middleware.WhiteNoiseMiddleware",  (add to MIDDLEWARE after django.contrib.sessions.middleware.SessionMiddleware)

#### api

- django-rest-framework
- django-cors-headers

#### database

- mysql

      pipenv install mysqlclient

- sqlite3

    1. copy sqlite3.exe to folder
    2. run

            sqlite3 shell

#### environment variables

 1. install [Decouple](https://pypi.org/project/python-decouple/)

        pipenv install python-decouple

 2. create .env in main project folder (same as settings)
 3. in settings.py

        from decouple import config

        SECRET_KEY = config('SECRET_KEY')

### Static folders

- create static directory at root
- subdirectories and files

        static/css
        static/css/base.css
        static/images
        static/js
        static/js/app.js

- add to settings.py under STATIC_URL

        STATIC_URL = "/static/"
        STATICFILES_DIRS = [BASE_DIR / "static"]
        STATIC_ROOT = STATIC_ROOT = BASE_DIR / "staticfiles"
        STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

- for production, run

        py manage.py collectstatic

### Media folders

    /media

- add to settings.py

        MEDIA_URL = "media/"
        MEDIA_ROOT = BASE_DIR / "media/"

- add to root urls file

        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

### Templates

- add /templates

        templates/base.html
        templates/navbar.html

- in settings, in TEMPLATES in DIRS add

       BASE_DIR / 'templates'

## Deployment

  1. Setup Python App
  2. In setup

      - Select Python Version 3.9.12?

      - Application Root is the directory where you will place the code files of your Django project.
      Make sure that it is a different folder than your domain root.

      - Application URL is the domain or subdomain where your app will run

      - In the Application Startup File, type "passenger_wsgi.py"

      - In the Application Entry Point, type "application"

  3. Setup Database
  4. Upload project
  5. Edit the passenger_wsgi.py file

          delete all, then add
          from [project folder containing settings.py].wsgi import application

  6. Edit settings.py

          ALLOWED_HOSTS, DEBUG

  7. In virtual env

          pip install pipenv
          pipenv sync
