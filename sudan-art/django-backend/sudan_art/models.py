import uuid
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from django.conf import settings
from PIL import Image
from io import BytesIO
from django.core.files import File
import re
from .media_storage import PublicMediaStorage

# Create your models here.

validate_artist = RegexValidator(
    regex="^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$",
    message="Artist names must be between 3 to 30 characters long. The following characters are allowed: Arabic "
    "letters and numbers, English letters and numbers, underscores, hyphens, and a space.",
)


def validate_tags(value):
    """
    Custom validator for tags
    :param value: string, comma separated tags
    """
    tags_regex = re.compile("^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9, ]{3,10}$")
    try:
        tags_list = value.split(",")
        if len(tags_list) < 3 or len(tags_list) > 6:
            raise ValidationError(
                "You must enter between 3 and 6 tags.",
                params={"value": value},
            )
        for tag in tags_list:
            match = re.search(tags_regex, tag)
            if not match:
                raise ValidationError(
                    "Tags must be between 3 and 10 characters long each. The following characters are allowed: Arabic "
                    "letters and numbers, English letters and numbers, a comma, and a space.",
                    params={"value": value},
                )
    except Exception:
        raise ValidationError(
            "You must enter between 3 and 6 tags, which must be between 3 and 10 characters long each. The "
            "following characters are allowed: Arabic letters and numbers, English letters and numbers, a comma, "
            "and a space.",
            params={"value": value},
        )


def rename_images(instance, filename):
    """
    Renames images to more human readable formats but uses the unique id field to ensure unique image names.
    :param instance: Artwork model instance
    :param filename: string, name of uploaded file. Validation for this is handled by Django default
    validation on the model Image Field.
    :return: string, more readable filename.
    """
    extension = filename.split(".")[-1]
    new_filename = "{}.{}".format(
        slugify(instance.artist + instance.tags + str(instance.id), extension),
        extension,
    )
    return new_filename


class Artwork(models.Model):
    artist = models.CharField(max_length=30, validators=[validate_artist])
    tags = models.CharField(max_length=30, validators=[validate_tags])
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )

    # Media files are server from the django server in development but a CDN in production hence the
    # two different settings here. The DEBUG value is handled by an environment variable.
    if settings.DEBUG:
        image = models.ImageField(upload_to=rename_images)
    else:
        image = models.ImageField(storage=PublicMediaStorage(), upload_to=rename_images)
    date_uploaded = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-date_uploaded"]

    def __str__(self):
        """
        Utility function to make sure the artwork is readable in the admin view.
        :return: readable string describing a model instance.
        """
        return self.artist + "-" + str(self.id)

    def save(self, *args, **kwargs):
        """
        Custom save function that overrides the model default. This ensures image saved to the database have
        smaller filesizes since the max upload is about 10MB.
        """
        new_image = self.reduce_image_size(self.image)
        self.image = new_image
        super().save(*args, **kwargs)

    def reduce_image_size(self, image):
        """
        Reduces image filesize.
        :param image: byte stream (I think?); the uploaded image.
        :return: Django File Object, smaller image.
        """
        pil_image_object = Image.open(image)
        small_image_io = BytesIO()
        # TODO: See if you should convert them to webp for better frontend performance
        pil_image_object.save(small_image_io, "jpeg", quality=85, optimize=True)
        new_image = File(small_image_io, name=image.name)
        return new_image
