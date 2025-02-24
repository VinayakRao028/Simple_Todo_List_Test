import os
from typing import Dict, Any

class Config:
    """Base configuration class."""
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    # Portfolio data file path
    DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), 'data', 'portfolio_data.json')
    
    # Swagger UI configuration
    SWAGGER = {
        'title': "Omkar's Portfolio API",
        'uiversion': 3,
        'specs_route': '/api/docs/'
    }

    @staticmethod
    def to_dict() -> Dict[str, Any]:
        return {key: getattr(Config, key) for key in dir(Config) if not key.startswith('__') and not callable(getattr(Config, key))}


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    

class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration."""
    # Production-specific settings can be added here
    pass


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Retrieve the active configuration based on the FLASK_ENV environment variable."""
    flask_env = os.environ.get('FLASK_ENV', 'development')
    return config.get(flask_env, config['default'])