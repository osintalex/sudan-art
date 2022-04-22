# -*- coding: utf-8 -*-
import os
import shutil
from datetime import datetime
from unittest.mock import patch
from uuid import uuid4

from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from sudan_art.models import Artwork

# Create your tests here.


class TestBase(TestCase):
    def setUp(self):
        uploaded_image = SimpleUploadedFile(
            name="test_image.jpg",
            content=open(
                os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
            ).read(),
            content_type="image/jpeg",
        )
        Artwork.objects.create(
            artist="حسين",
            tags="السودان,وقفة احتجاجية,فن",
            high_res_image=uploaded_image,
            thumbnail=uploaded_image,
            url="https://www.example.com",
        )

    def tearDown(self):
        shutil.rmtree(settings.MEDIA_ROOT)


class ArtworkModelTest(TestBase):
    def test_artwork_tags(self):
        artwork_instance = Artwork.objects.get(artist="حسين")
        self.assertEqual(artwork_instance.tags, "السودان,وقفة احتجاجية,فن")

    def test_artwork_unique_id(self):
        artwork_instance = Artwork.objects.get(artist="حسين")
        self.assertTrue(isinstance(artwork_instance.id, type(uuid4())))

    def test_artwork_upload_date(self):
        artwork_instance = Artwork.objects.get(artist="حسين")
        self.assertEqual(
            artwork_instance.date_uploaded.strftime("%Y-%m-%d"),
            datetime.today().strftime("%Y-%m-%d"),
        )

    def test_artwork_url(self):
        artwork_instance = Artwork.objects.get(artist="حسين")
        self.assertEqual(artwork_instance.url, "https://www.example.com")


class SudanArtViewsTest(TestBase):
    def test_get_recent_artwork(self):
        response = self.client.get(reverse("recent"))
        self.assertEqual(response.data["results"][0]["artist"], "حسين")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch("sudan_art.views.requests.Session.post")
    def test_upload_artwork(self, mocked):
        mocked.return_value.json.return_value = [
            {"translations": [{"text": "sudan", "to": "en"}]}
        ]
        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "حسين",
                    "tags": "السودان,وقفة احتجاجية,فن",
                    "url": "https://sudanese-revolution.org",
                    "image": test_image_file,
                    "target_language": "en",
                },
                format="multipart",
            )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_artist_name(self):

        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "$$$H4CK3RZ$$$!>",
                    "tags": "السودان,وقفة احتجاجية,فن",
                    "image": test_image_file,
                    "url": "https://sudanese-revolution.org",
                    "target_language": "en",
                },
                format="multipart",
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_tags(self):
        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "حسين",
                    "tags": "root.protocol(delete some shit)",
                    "image": test_image_file,
                    "url": "https://sudanese-revolution.org",
                    "target_language": "en",
                },
                format="multipart",
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_target_language(self):
        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "حسين",
                    "tags": "root.protocol(delete some shit)",
                    "image": test_image_file,
                    "url": "https://sudanese-revolution.org",
                    "target_language": "german",
                },
                format="multipart",
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_url(self):
        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "حسين",
                    "tags": "root.protocol(delete some shit)",
                    "image": test_image_file,
                    "url": "I am not a url",
                    "target_language": "german",
                },
                format="multipart",
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_search_artwork(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "السودان",
                "artist": "حسين",
                "date_from": "2020-01-01",
                "date_to": "2090-01-01",
            },
        )
        self.assertEqual(response.data["results"][0]["artist"], "حسين")
        self.assertEqual(
            response.data["results"][0]["tags"], "السودان,وقفة احتجاجية,فن"
        )
        self.assertTrue("thumbnail" and "high_res_image" in response.data["results"][0])

    def test_invalid_search_query(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "WM_DELETE_WINDOW()",
                "artist": "حسين",
                "date_from": "2020-01-01",
                "date_to": "2090-01-01",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_artist_query(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "السودان",
                "artist": "root.bind(some stuff)",
                "date_from": "2020-01-01",
                "date_to": "2090-01-01",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_date_from(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "السودان",
                "artist": "حسين",
                "date_from": "crypt.write(goodbye)",
                "date_to": "2090-01-01",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_date_to(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "السودان",
                "artist": "حسين",
                "date_from": "2020-01-01",
                "date_to": "crypt.write(goodbye)*",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
