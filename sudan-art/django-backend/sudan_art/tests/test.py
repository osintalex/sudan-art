from django.test import TestCase
from rest_framework.test import APIClient
from sudan_art.models import Artwork
from sudan_art.serializers import ArtworkSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
from django.urls import reverse
from rest_framework import status
from uuid import uuid4
from datetime import datetime
import shutil
import os


# Create your tests here.


class ArtworkModelTest(TestCase):

    def setUp(self):
        # TODO: Change all of these to arabic as that better reflects user behaviour
        uploaded_image = SimpleUploadedFile(
                name="test_image.jpg",
                content=open(
                    os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
                ).read(),
                content_type="image/jpeg",
            )
        Artwork.objects.create(
            artist="hussein",
            tags="sudan,protest,art",
            high_res_image=uploaded_image,
            thumbnail=uploaded_image
        )

    def test_artwork_tags(self):
        artwork_instance = Artwork.objects.get(artist="hussein")
        self.assertEqual(artwork_instance.tags, "sudan,protest,art")

    def test_artwork_unique_id(self):
        artwork_instance = Artwork.objects.get(artist="hussein")
        self.assertTrue(isinstance(artwork_instance.id, type(uuid4())))

    def test_artwork_upload_date(self):
        artwork_instance = Artwork.objects.get(artist="hussein")
        self.assertEqual(
            artwork_instance.date_uploaded.strftime("%Y-%m-%d"),
            datetime.today().strftime("%Y-%m-%d"),
        )

    # TODO: Security tests, i.e. try to create invalid Artwork instances and check they fail

    # TODO: Check this teardown method is actually necessary and not done by default
    def tearDown(self):
        shutil.rmtree(settings.MEDIA_ROOT)


# TODO: This set up is duplicated, inherit from above
class SudanArtViewsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # TODO: Change all of these to arabic as that better reflects user behaviour
        uploaded_image = SimpleUploadedFile(
            name="test_image.jpg",
            content=open(
                os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
            ).read(),
            content_type="image/jpeg",
        )
        Artwork.objects.create(
            artist="hussein",
            tags="sudan,protest,art",
            high_res_image=uploaded_image,
            thumbnail=uploaded_image
        )

    def test_get_recent_artwork(self):
        response = self.client.get(reverse("recent"))
        self.assertEqual(response.data["results"][0]["artist"], "hussein")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_upload_artwork(self):
        # TODO: Add an arabic version
        with open(
            os.path.join(os.getcwd(), "sudan_art/tests/test_image.jpg"), "rb"
        ) as test_image_file:
            response = self.client.post(
                reverse("upload"),
                {
                    "artist": "hussein",
                    "tags": "sudan,protest,mural",
                    "image": test_image_file,
                },
                format="multipart",
            )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_search_artwork(self):
        response = self.client.get(
            reverse("search"),
            {
                "search": "sudan",
                "artist": "hussein",
                "date_from": "2020-01-01",
                "date_to": "2090-01-01",
            },
        )
        self.assertEqual(response.data["results"][0]["artist"], "hussein")
        self.assertEqual(response.data["results"][0]["tags"], "sudan,protest,art")
        self.assertTrue("thumbnail" and "high_res_image" in response.data["results"][0])

    # TODO: Add some invalid search query terms and check they don't pass
