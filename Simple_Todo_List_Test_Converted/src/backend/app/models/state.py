from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource
from flask import jsonify
from flask_cors import cross_origin

db = SQLAlchemy()

class State(db.Model):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    country_code = db.Column(db.String(2), nullable=False)

    def __init__(self, name, country_code):
        self.name = name
        self.country_code = country_code

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country_code': self.country_code
        }

class StateResource(Resource):
    @cross_origin(origins=["https://ecommerce-angular-app.victorgarciar.com", "https://frontend-ecommerce-angular.vercel.app"])
    def get(self):
        states = State.query.all()
        return jsonify([state.to_dict() for state in states])

    @cross_origin(origins=["https://ecommerce-angular-app.victorgarciar.com", "https://frontend-ecommerce-angular.vercel.app"])
    def get_by_country_code(self, code):
        states = State.query.filter_by(country_code=code).all()
        return jsonify([state.to_dict() for state in states])

# This function can be used to set up the routes in your main Flask application
def setup_routes(api):
    api.add_resource(StateResource, '/api/states')
    api.add_resource(StateResource, '/api/states/<string:code>', endpoint='states_by_country')