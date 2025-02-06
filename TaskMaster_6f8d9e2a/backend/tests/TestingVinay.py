import unittest
from unittest.mock import patch
import sys
import os

# Add the src directory to the Python path to import backend modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from utils.prep import check_pep8_compliance

class TestVinay(unittest.TestCase):

    def test_pep8_compliance_check(self):
        # Test the PEP 8 compliance checker
        compliant_code = """
def hello_world():
    print("Hello, World!")
"""
        non_compliant_code = """
def hello_world():
 print("Hello, World!")
"""
        
        is_violation, messages = check_pep8_compliance(compliant_code)
        self.assertFalse(is_violation, "Compliant code should not have violations")
        
        is_violation, messages = check_pep8_compliance(non_compliant_code)
        self.assertTrue(is_violation, "Non-compliant code should have violations")
        self.assertGreater(len(messages), 0, "There should be error messages for non-compliant code")

    # TODO: Add more tests for backend functionality
    
    @patch('utils.some_module.some_function')
    def test_mock_example(self, mock_function):
        # This is an example of how to use mocking in tests
        mock_function.return_value = "mocked result"
        # Add assertions here
        pass

if __name__ == '__main__':
    unittest.main()