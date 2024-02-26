# Configuration file for the Sphinx documentation builder.
import os
import sys
from time import strftime
import django


sys.path.append('D:/4-2/455_SQA/Myrpoejct/E-commerce-System/backend/backend') # The directory that contains settings.py

# Set up the Django settings/environment
from django.core.management import setup_environ
from backend.backend import settings

setup_environ(settings)
import django
sys.path.insert(0, os.path.abspath('../views'))
django.setup()

# Project information
project = 'Ecommerce'
copyright = '2024, bugs hunter'
author = 'bugs hunter'

# Sphinx extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',  # Optional: Support for Google-style docstrings
]

# Autodoc settings
autodoc_mock_imports = [
    'django',  # Mock Django to prevent autodoc from trying to import it
    # Add other dependencies if needed
]

# HTML theme
html_theme = 'alabaster'
