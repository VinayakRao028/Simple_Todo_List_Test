"""
This module initializes the controllers package for the Flask application.
It may include imports of controller modules and any necessary setup for the controllers.
"""

from flask import Blueprint
from flask_restx import Api

# Create a Blueprint for the API
api_bp = Blueprint('api', __name__)

# Create an Api object
api = Api(api_bp,
          title='Portfolio API',
          version='1.0',
          description='API for Omkar\'s Portfolio')

# Import controllers
from .api_controller import api as api_controller

# Add namespaces to the API
api.add_namespace(api_controller)