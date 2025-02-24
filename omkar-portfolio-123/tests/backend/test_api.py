import unittest
import json
from flask import Flask
from unittest.mock import patch, mock_open
from app import create_app
from app.services.data_service import DataService
from app.models.portfolio_data import PortfolioData, Skill, Project, Recommendation

class TestPortfolioApp(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    @patch('app.services.data_service.DataService.load_portfolio_data')
    def test_get_portfolio(self, mock_load_data):
        # Mock data
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[Skill(name="Python", level=90)],
            projects=[Project(title="Portfolio", description="A portfolio website", technologies=["Flask"], image_url="image.jpg", project_url="http://example.com")],
            recommendations=[Recommendation(name="Jane Doe", relationship="Colleague", comment="Great developer")],
            contact_info={"email": "john@example.com"}
        )
        mock_load_data.return_value = mock_data

        response = self.client.get('/api/portfolio')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "John Doe")
        self.assertEqual(len(data['skills']), 1)
        self.assertEqual(len(data['projects']), 1)
        self.assertEqual(len(data['recommendations']), 1)

    @patch('app.services.data_service.DataService.load_portfolio_data')
    def test_get_about(self, mock_load_data):
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[],
            projects=[],
            recommendations=[],
            contact_info={"email": "john@example.com"}
        )
        mock_load_data.return_value = mock_data

        response = self.client.get('/api/about')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "John Doe")
        self.assertEqual(data['title'], "Software Developer")

    @patch('app.services.data_service.DataService.load_portfolio_data')
    def test_get_skills(self, mock_load_data):
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[Skill(name="Python", level=90), Skill(name="JavaScript", level=80)],
            projects=[],
            recommendations=[],
            contact_info={}
        )
        mock_load_data.return_value = mock_data

        response = self.client.get('/api/skills')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], "Python")
        self.assertEqual(data[1]['name'], "JavaScript")

    @patch('app.services.data_service.DataService.load_portfolio_data')
    def test_get_projects(self, mock_load_data):
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[],
            projects=[
                Project(title="Project 1", description="Description 1", technologies=["Python"], image_url="image1.jpg", project_url="http://example1.com"),
                Project(title="Project 2", description="Description 2", technologies=["JavaScript"], image_url="image2.jpg", project_url="http://example2.com")
            ],
            recommendations=[],
            contact_info={}
        )
        mock_load_data.return_value = mock_data

        response = self.client.get('/api/projects')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['title'], "Project 1")
        self.assertEqual(data[1]['title'], "Project 2")

    @patch('app.services.data_service.DataService.load_portfolio_data')
    def test_get_recommendations(self, mock_load_data):
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[],
            projects=[],
            recommendations=[
                Recommendation(name="Jane Doe", relationship="Colleague", comment="Great developer"),
                Recommendation(name="Bob Smith", relationship="Manager", comment="Excellent work")
            ],
            contact_info={}
        )
        mock_load_data.return_value = mock_data

        response = self.client.get('/api/recommendations')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], "Jane Doe")
        self.assertEqual(data[1]['name'], "Bob Smith")

    @patch('app.services.data_service.DataService.load_portfolio_data')
    @patch('app.services.data_service.DataService.add_recommendation')
    def test_add_recommendation(self, mock_add_recommendation, mock_load_data):
        mock_data = PortfolioData(
            name="John Doe",
            title="Software Developer",
            about="Experienced developer",
            skills=[],
            projects=[],
            recommendations=[],
            contact_info={}
        )
        mock_load_data.return_value = mock_data
        mock_add_recommendation.return_value = True

        new_recommendation = {
            "name": "Alice Johnson",
            "company": "Tech Co",
            "designation": "CTO",
            "message": "Fantastic developer!"
        }
        response = self.client.post('/api/recommendations', json=new_recommendation)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['message'], "Recommendation added successfully")

    def test_add_recommendation_invalid_data(self):
        invalid_recommendation = {
            "company": "Tech Co",
            "designation": "CTO"
        }
        response = self.client.post('/api/recommendations', json=invalid_recommendation)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['error'], "Name and message are required")

if __name__ == '__main__':
    unittest.main()