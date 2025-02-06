import unittest
import sys
import os

# Add the src directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from utils.prep import check_pep8_compliance

class TestPEP8Compliance(unittest.TestCase):
    def setUp(self):
        """Set up common test cases."""
        self.compliant_code = """
def hello_world():
    print("Hello, World!")
"""
        self.non_compliant_code = """
def hello_world():
 print( "Hello, World!" )
"""

    def test_compliant_code(self):
        """Test that PEP 8 compliant code passes the check."""
        has_violations, messages = check_pep8_compliance(self.compliant_code)
        self.assertFalse(has_violations)
        self.assertEqual(len(messages), 1)
        self.assertIn("No PEP 8 violations found", messages[0])

    def test_non_compliant_code(self):
        """Test that code with PEP 8 violations fails the check."""
        has_violations, messages = check_pep8_compliance(self.non_compliant_code)
        self.assertTrue(has_violations)
        self.assertGreater(len(messages), 1)
        self.assertIn("E201", ' '.join(messages))  # Whitespace after '('
        self.assertIn("E202", ' '.join(messages))  # Whitespace before ')'
        self.assertIn("E111", ' '.join(messages))  # Indentation is not a multiple of four

    def test_empty_string(self):
        """Test that an empty string is considered PEP 8 compliant."""
        has_violations, messages = check_pep8_compliance("")
        self.assertFalse(has_violations)
        self.assertEqual(len(messages), 1)
        self.assertIn("No PEP 8 violations found", messages[0])

    def test_invalid_python_code(self):
        """Test how the function handles invalid Python syntax."""
        code = "This is not valid Python code"
        has_violations, messages = check_pep8_compliance(code)
        # Note: pycodestyle doesn't check for valid Python syntax,
        # so this might not result in violations. We should verify this behavior.
        self.assertFalse(has_violations)
        self.assertEqual(len(messages), 1)
        self.assertIn("No PEP 8 violations found", messages[0])

    def test_line_length_violation(self):
        """Test that lines exceeding 79 characters are flagged."""
        code = "print('This is a very long line that exceeds the recommended maximum line length of 79 characters')"
        has_violations, messages = check_pep8_compliance(code)
        self.assertTrue(has_violations)
        self.assertIn("E501", ' '.join(messages))  # Line too long

    def test_naming_convention_violation(self):
        """Test that violations of naming conventions are flagged."""
        code = """
def BadFunctionName():
    pass
"""
        has_violations, messages = check_pep8_compliance(code)
        self.assertTrue(has_violations)
        self.assertIn("N802", ' '.join(messages))  # Function name should be lowercase

    def test_complex_code(self):
        """Test the function with a larger, more complex piece of code."""
        complex_code = """
import os
from typing import List, Dict

def process_data(data: List[Dict[str, int]]) -> Dict[str, int]:
    result = {}
    for item in data:
        for key, value in item.items():
            if key in result:
                result[key] += value
            else:
                result[key] = value
    return result

if __name__ == "__main__":
    sample_data = [{"a": 1, "b": 2}, {"b": 3, "c": 4}]
    print(process_data(sample_data))
"""
        has_violations, messages = check_pep8_compliance(complex_code)
        self.assertFalse(has_violations)
        self.assertEqual(len(messages), 1)
        self.assertIn("No PEP 8 violations found", messages[0])

    def test_error_handling(self):
        """Test that the function handles unexpected inputs gracefully."""
        inputs = [None, 42, [], {}]
        for input_value in inputs:
            with self.subTest(input=input_value):
                try:
                    has_violations, messages = check_pep8_compliance(input_value)
                    # If no exception is raised, ensure it returns a boolean and a list
                    self.assertIsInstance(has_violations, bool)
                    self.assertIsInstance(messages, list)
                except Exception as e:
                    # If an exception is raised, it should be a TypeError
                    self.assertIsInstance(e, TypeError)

if __name__ == '__main__':
    unittest.main()