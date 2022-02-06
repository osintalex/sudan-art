from rest_framework import serializers, fields
from .models import Artwork


# Note that this serializer does a lot of security work; it handles a lot of validation in views.py
# The validation for the serializer is all inherited from the validation on Art in models.py
class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ("artist", "tags", "thumbnail", "high_res_image", "date_uploaded")
