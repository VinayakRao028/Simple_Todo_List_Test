from flask import Flask
from flask_swagger_ui import get_swaggerui_blueprint
from app.controllers.api_controller import api_bp
from app.models.portfolio_data import load_portfolio_data

def create_app():
    app = Flask(__name__, static_folder='../public', static_url_path='')

    # Load portfolio data
    portfolio_data = load_portfolio_data()

    # Register API blueprint
    app.register_blueprint(api_bp)

    # Swagger configuration
    SWAGGER_URL = '/api/docs'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "Omkar's Portfolio API"
        }
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    return app