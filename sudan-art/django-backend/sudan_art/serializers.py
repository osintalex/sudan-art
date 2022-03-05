# -*- coding: utf-8 -*-

"""
Artwork class serializer. This also handles a lot of data validaiton.
"""

from rest_framework import serializers

from .models import Artwork


class ArtworkSerializer(serializers.ModelSerializer):
    """Artwork model serializer."""

    class Meta:
        """Metadata for the parent class."""

        model = Artwork
        fields = ("artist", "tags", "thumbnail", "high_res_image", "date_uploaded")
