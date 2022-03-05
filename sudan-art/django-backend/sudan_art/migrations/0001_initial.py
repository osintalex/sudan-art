# -*- coding: utf-8 -*-
# Generated by Django 4.0 on 2022-02-18 22:29

import uuid

import django.core.validators
import sudan_art.media_storage
import sudan_art.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Artwork",
            fields=[
                (
                    "artist",
                    models.CharField(
                        max_length=30,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="Artist names must be between 3 to 30 characters long. The following characters are allowed: Arabic letters and numbers, English letters and numbers, underscores, hyphens, and a space.",
                                regex="^[ء-ي٠-٩ a-zA-Z0-9]{3,30}$",
                            )
                        ],
                    ),
                ),
                (
                    "tags",
                    models.CharField(
                        max_length=30, validators=[sudan_art.models.validate_tags]
                    ),
                ),
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                (
                    "thumbnail",
                    models.ImageField(
                        storage=sudan_art.media_storage.PublicMediaStorage(),
                        upload_to=sudan_art.models.rename_thumbnail,
                    ),
                ),
                (
                    "high_res_image",
                    models.ImageField(
                        storage=sudan_art.media_storage.PublicMediaStorage(),
                        upload_to=sudan_art.models.rename_highres,
                    ),
                ),
                ("date_uploaded", models.DateField(auto_now_add=True)),
            ],
            options={
                "ordering": ["-date_uploaded"],
            },
        ),
    ]