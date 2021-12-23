import uuid
from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.text import slugify
import os
from PIL import Image
from io import BytesIO
from django.core.files import File
import re
from .media_storage import PublicMediaStorage
# Create your models here.

validate_artist = RegexValidator(
    regex='^[\u0621-\u064A\u0660-\u0669 a-zA-Z0-9]{3,30}$',
    message='Artist names must be between 3 to 30 characters long. The following characters are allowed: Arabic '
            'letters and numbers, English letters and numbers, underscores, hyphens, and a space.',
)


def validate_tags(value):
    tags_regex = re.compile('^[\u0621-\u064A\u0660-\u0669a-zA-Z0-9, ]{3,10}$')
    try:
        tags_list = value.split(',')
        if len(tags_list) < 3 or len(tags_list) > 6:
            raise ValidationError(
                'You must enter between 3 and 6 tags.',
                params={'value': value},
            )
        for tag in tags_list:
            match = re.search(tags_regex, tag)
            if not match:
                raise ValidationError(
                    'Tags must be between 3 and 10 characters long each. The following characters are allowed: Arabic '
                    'letters and numbers, English letters and numbers, a comma, and a space.',
                    params={'value': value},
                )
    except Exception:
        raise ValidationError(
                'You must enter between 3 and 6 tags, which must be between 3 and 10 characters long each. The '
                'following characters are allowed: Arabic letters and numbers, English letters and numbers, a comma, '
                'and a space.',
                params={'value': value},
            )


def image_absolute_path(instance, filename):
    extension = filename.split('.')[-1]
    filename = '{}.{}'.format(slugify(instance.artist + instance.tags, extension), extension)
    return os.path.join('images', filename)


class Artwork(models.Model):
    artist = models.CharField(max_length=30, validators=[validate_artist])
    tags = models.CharField(max_length=30, validators=[validate_tags])
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    image = models.ImageField(storage=PublicMediaStorage())
    date_uploaded = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ["-date_uploaded"]

    def __str__(self):
        return self.artist + "-" + str(self.id)

    def save(self, *args, **kwargs):
        new_image = self.reduce_image_size(self.image)
        self.image = new_image
        super().save(*args, **kwargs)

    def reduce_image_size(self, image):
        pil_image_object = Image.open(image)
        small_image_io = BytesIO()
        pil_image_object.save(small_image_io, 'jpeg', quality=85, optimize=True)
        new_image = File(small_image_io, name=image.name)
        return new_image
