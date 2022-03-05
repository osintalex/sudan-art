# -*- coding: utf-8 -*-
"""
Settings for storing media on a CDN - used in production only.
"""
# pylint: disable=W0223

from storages.backends.s3boto3 import S3Boto3Storage


class PublicMediaStorage(S3Boto3Storage):
    """Media storage class."""

    location = "media"
    default_acl = "public-read"
    file_overwrite = False
