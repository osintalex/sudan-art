# -*- coding: utf-8 -*-
"""django_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from sudan_art import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("upload/", views.add_artwork, name="upload"),
    path("api/artwork/", views.ArtworkList.as_view(), name="search"),
    path("recent/", views.recent_artwork, name="recent"),
]

# In production media files are served from a CDN, in development they are served from
# the Django dev server which is what this setting allows for.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
