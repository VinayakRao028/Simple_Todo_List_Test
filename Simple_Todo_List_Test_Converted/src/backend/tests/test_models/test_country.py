import unittest
from unittest.mock import Mock, patch
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

# Mock SQLAlchemy
Base = declarative_base()

# Mock db object
class MockDB:
    Model = Base

db = MockDB()

# Recreate the Country model for testing
class Country(db.Model):
    __tablename__ = 'country'

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(255))
    name = Column(String(255))
    
    states = relationship("State", back_populates="country")

    def __repr__(self):
        return f"<Country(id={self.id}, code='{self.code}', name='{self.name}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.code,
            'name': self.name
        }

class TestCountryModel(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Create an in-memory SQLite database for testing
        cls.engine = create_engine('sqlite:///:memory:')
        Base.metadata.create_all(cls.engine)
        cls.Session = sessionmaker(bind=cls.engine)

    def setUp(self):
        # Create a new session for each test
        self.session = self.Session()

    def tearDown(self):
        # Close the session after each test
        self.session.close()

    def test_create_country(self):
        # Test creating a new country
        country = Country(code='US', name='United States')
        self.session.add(country)
        self.session.commit()

        # Retrieve the country from the database
        retrieved_country = self.session.query(Country).filter_by(code='US').first()

        self.assertIsNotNone(retrieved_country)
        self.assertEqual(retrieved_country.code, 'US')
        self.assertEqual(retrieved_country.name, 'United States')

    def test_update_country(self):
        # Test updating an existing country
        country = Country(code='CA', name='Canada')
        self.session.add(country)
        self.session.commit()

        # Update the country
        country.name = 'Canada Updated'
        self.session.commit()

        # Retrieve the updated country
        updated_country = self.session.query(Country).filter_by(code='CA').first()

        self.assertEqual(updated_country.name, 'Canada Updated')

    def test_delete_country(self):
        # Test deleting a country
        country = Country(code='FR', name='France')
        self.session.add(country)
        self.session.commit()

        # Delete the country
        self.session.delete(country)
        self.session.commit()

        # Try to retrieve the deleted country
        deleted_country = self.session.query(Country).filter_by(code='FR').first()

        self.assertIsNone(deleted_country)

    def test_country_repr(self):
        # Test the __repr__ method
        country = Country(id=1, code='DE', name='Germany')
        expected_repr = "<Country(id=1, code='DE', name='Germany')>"
        self.assertEqual(repr(country), expected_repr)

    def test_country_to_dict(self):
        # Test the to_dict method
        country = Country(id=2, code='JP', name='Japan')
        expected_dict = {
            'id': 2,
            'code': 'JP',
            'name': 'Japan'
        }
        self.assertEqual(country.to_dict(), expected_dict)

    def test_invalid_country_code(self):
        # Test creating a country with an invalid code (too long)
        with self.assertRaises(Exception):  # Adjust the exception type if needed
            country = Country(code='INVALID', name='Invalid Country')
            self.session.add(country)
            self.session.commit()

    def test_duplicate_country_code(self):
        # Test creating countries with duplicate codes
        country1 = Country(code='UK', name='United Kingdom')
        country2 = Country(code='UK', name='Ukraine')
        
        self.session.add(country1)
        self.session.commit()
        
        self.session.add(country2)
        with self.assertRaises(Exception):  # Adjust the exception type if needed
            self.session.commit()

    @patch('app.models.country.relationship')
    def test_country_states_relationship(self, mock_relationship):
        # Test the relationship with states
        mock_state = Mock()
        mock_relationship.return_value = [mock_state]

        country = Country(code='ES', name='Spain')
        self.assertEqual(country.states, [mock_state])

if __name__ == '__main__':
    unittest.main()