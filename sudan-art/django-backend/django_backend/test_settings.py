# -*- coding: utf-8 -*-
"""
Settings to use a SQL lite in memory database for tests, allowing tests without a postgres db.
"""

from .dev_settings import *

DATABASES["default"] = {"ENGINE": "django.db.backends.sqlite3"}
