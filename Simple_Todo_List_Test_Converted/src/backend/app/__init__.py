from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
import os
import logging

# Initialize extensions
db = SQLAlchemy()
api = Api()

def create_app(config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    if config is None:
        # Use environment variables for configuration
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    else:
        # Use provided configuration
        app.config.update(config)
    
    # Initialize extensions with the app
    db.init_app(app)
    CORS(app)  # Enable CORS for all domains on all routes
    
    # Set up logging
    if not app.debug:
        logging.basicConfig(level=logging.INFO)
        app.logger.info('Todo List startup')
    
    # Import and register models
    from .models.country import Country
    from .models.state import State
    
    # Import and register blueprints
    from .views.main import main_blueprint
    app.register_blueprint(main_blueprint)
    
    # Initialize API and register resources
    api.init_app(app)
    from .models.state import StateResource
    api.add_resource(StateResource, '/api/states', '/api/states/<string:country_code>')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        """Handle 404 errors."""
        return {'error': 'Not Found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        """Handle 500 errors."""
        db.session.rollback()
        return {'error': 'Internal Server Error'}, 500
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app