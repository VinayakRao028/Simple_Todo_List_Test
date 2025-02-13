import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# Mock the external dependencies
class MockDB:
    class Model:
        pass

    class Column:
        def __init__(self, *args, **kwargs):
            pass

    def __init__(self):
        self.Model = self.Model
        self.Column = self.Column
        self.Integer = int
        self.String = str

    def create_all(self):
        pass

class MockResource:
    pass

class MockCORS:
    def __init__(self, *args, **kwargs):
        pass

# Implement the State model
db = MockDB()

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

# Implement the StateResource
class StateResource(MockResource):
    @MockCORS(origins=["https://ecommerce-angular-app.victorgarciar.com", "https://frontend-ecommerce-angular.vercel.app"])
    def get(self):
        states = State.query.all()
        return jsonify([state.to_dict() for state in states])

    @MockCORS(origins=["https://ecommerce-angular-app.victorgarciar.com", "https://frontend-ecommerce-angular.vercel.app"])
    def get_by_country_code(self, code):
        states = State.query.filter_by(country_code=code).all()
        return jsonify([state.to_dict() for state in states])

# Test cases
class TestState(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.db = SQLAlchemy(self.app)
        self.api = Api(self.app)
        
        with self.app.app_context():
            self.db.create_all()

    def test_state_model(self):
        state = State(name="California", country_code="US")
        self.assertEqual(state.name, "California")
        self.assertEqual(state.country_code, "US")

    def test_state_to_dict(self):
        state = State(name="New York", country_code="US")
        state.id = 1
        expected_dict = {
            'id': 1,
            'name': "New York",
            'country_code': "US"
        }
        self.assertEqual(state.to_dict(), expected_dict)

    @patch('flask_sqlalchemy.SQLAlchemy.Model.query')
    def test_get_all_states(self, mock_query):
        mock_states = [
            State(name="California", country_code="US"),
            State(name="New York", country_code="US"),
            State(name="Texas", country_code="US")
        ]
        mock_query.all.return_value = mock_states

        with self.app.test_request_context():
            resource = StateResource()
            response = resource.get()
            data = response.get_json()

        self.assertEqual(len(data), 3)
        self.assertEqual(data[0]['name'], "California")
        self.assertEqual(data[1]['name'], "New York")
        self.assertEqual(data[2]['name'], "Texas")

    @patch('flask_sqlalchemy.SQLAlchemy.Model.query')
    def test_get_states_by_country_code(self, mock_query):
        mock_states = [
            State(name="Ontario", country_code="CA"),
            State(name="Quebec", country_code="CA")
        ]
        mock_query.filter_by.return_value.all.return_value = mock_states

        with self.app.test_request_context():
            resource = StateResource()
            response = resource.get_by_country_code("CA")
            data = response.get_json()

        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], "Ontario")
        self.assertEqual(data[1]['name'], "Quebec")
        self.assertEqual(data[0]['country_code'], "CA")
        self.assertEqual(data[1]['country_code'], "CA")

if __name__ == '__main__':
    unittest.main()