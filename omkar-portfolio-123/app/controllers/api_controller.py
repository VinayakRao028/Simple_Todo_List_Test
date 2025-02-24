from flask import Blueprint, jsonify, request
from flasgger import swag_from
from app.services.data_service import DataService

api = Blueprint('api', __name__)
data_service = DataService()

@api.route('/api/portfolio', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Portfolio data',
            'schema': {
                'type': 'object',
                'properties': {
                    'about': {'type': 'object'},
                    'skills': {'type': 'array'},
                    'projects': {'type': 'array'},
                    'recommendations': {'type': 'array'}
                }
            }
        }
    }
})
def get_portfolio():
    """
    Get the entire portfolio data
    This endpoint returns all sections of the portfolio including about, skills, projects, and recommendations.
    """
    portfolio_data = data_service.get_portfolio_data()
    return jsonify(portfolio_data)

@api.route('/api/about', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'About section data',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'email': {'type': 'string'},
                    'phone': {'type': 'string'},
                    'bio': {'type': 'string'}
                }
            }
        }
    }
})
def get_about():
    """
    Get the about section data
    This endpoint returns information about the portfolio owner.
    """
    about_data = data_service.get_about_data()
    return jsonify(about_data)

@api.route('/api/skills', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Skills data',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'name': {'type': 'string'},
                        'level': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_skills():
    """
    Get the skills data
    This endpoint returns a list of skills and their proficiency levels.
    """
    skills_data = data_service.get_skills_data()
    return jsonify(skills_data)

@api.route('/api/projects', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Projects data',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'name': {'type': 'string'},
                        'description': {'type': 'string'},
                        'image': {'type': 'string'},
                        'url': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_projects():
    """
    Get the projects data
    This endpoint returns a list of projects with their details.
    """
    projects_data = data_service.get_projects_data()
    return jsonify(projects_data)

@api.route('/api/recommendations', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'Recommendations data',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'name': {'type': 'string'},
                        'company': {'type': 'string'},
                        'designation': {'type': 'string'},
                        'message': {'type': 'string'}
                    }
                }
            }
        }
    }
})
def get_recommendations():
    """
    Get the recommendations data
    This endpoint returns a list of recommendations from colleagues or clients.
    """
    recommendations_data = data_service.get_recommendations_data()
    return jsonify(recommendations_data)

@api.route('/api/recommendations', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'recommendation',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'company': {'type': 'string'},
                    'designation': {'type': 'string'},
                    'message': {'type': 'string'}
                },
                'required': ['name', 'message']
            }
        }
    ],
    'responses': {
        201: {
            'description': 'Recommendation added successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        400: {
            'description': 'Bad request',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def add_recommendation():
    """
    Add a new recommendation
    This endpoint allows adding a new recommendation to the portfolio.
    """
    data = request.json
    if not data or 'name' not in data or 'message' not in data:
        return jsonify({'error': 'Name and message are required'}), 400
    
    new_recommendation = {
        'name': data['name'],
        'company': data.get('company', ''),
        'designation': data.get('designation', ''),
        'message': data['message']
    }
    
    success = data_service.add_recommendation(new_recommendation)
    if success:
        return jsonify({'message': 'Recommendation added successfully'}), 201
    else:
        return jsonify({'error': 'Failed to add recommendation'}), 500