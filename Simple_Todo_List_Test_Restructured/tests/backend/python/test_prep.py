import unittest
from unittest.mock import patch, MagicMock
import io
import sys

# Mock implementation of pycodestyle
class MockStyleGuide:
    def __init__(self, quiet=True):
        self.quiet = quiet

class MockChecker:
    def __init__(self, filename, lines):
        self.filename = filename
        self.lines = lines
        self.report = MagicMock()

    def check_all(self):
        pass

class MockReport:
    def __init__(self):
        self._deferred_print = []

# Implementation of the function to be tested
def check_pep8_compliance(script_code):
    """
    Check the given script code for PEP 8 compliance.

    Args:
        script_code (str): The Python code to be checked.

    Returns:
        tuple: A boolean indicating if there are violations and a list of messages.
    """
    style = MockStyleGuide(quiet=True)
    report = MockChecker("<string>", script_code)

    report.check_all()
    errors = list(report.report._deferred_print)

    if not errors:
        msg = ['The Code follows PEP 8 style guidelines.']
        return False, msg
    else:
        msg = [f'The Code has {len(errors)} PEP 8 violations:']
        for error in errors:
            msg.append(str(error))
        
        return True, msg

class TestPEP8Compliance(unittest.TestCase):

    @patch('pycodestyle.StyleGuide', MockStyleGuide)
    @patch('pycodestyle.Checker', MockChecker)
    def test_pep8_compliant_code(self):
        code = """
def hello_world():
    print("Hello, World!")
"""
        has_violations, messages = check_pep8_compliance(code)
        self.assertFalse(has_violations)
        self.assertEqual(messages, ['The Code follows PEP 8 style guidelines.'])

    @patch('pycodestyle.StyleGuide', MockStyleGuide)
    @patch('pycodestyle.Checker', MockChecker)
    def test_pep8_non_compliant_code(self):
        code = """
def HELLO_WORLD():
 print ( "Hello, World!" )
"""
        # Mock PEP 8 violations
        MockChecker.report = MagicMock()
        MockChecker.report._deferred_print = [
            "E302 expected 2 blank lines, found 0",
            "E201 whitespace after '('",
            "E202 whitespace before ')'",
            "E303 too many blank lines (3)"
        ]

        has_violations, messages = check_pep8_compliance(code)
        self.assertTrue(has_violations)
        self.assertEqual(len(messages), 5)  # 1 summary message + 4 error messages
        self.assertEqual(messages[0], 'The Code has 4 PEP 8 violations:')

    def test_empty_code(self):
        code = ""
        has_violations, messages = check_pep8_compliance(code)
        self.assertFalse(has_violations)
        self.assertEqual(messages, ['The Code follows PEP 8 style guidelines.'])

    @patch('pycodestyle.StyleGuide', MockStyleGuide)
    @patch('pycodestyle.Checker', MockChecker)
    def test_code_with_syntax_error(self):
        code = """
def invalid_function(
    print("This is invalid Python syntax")
"""
        # Mock PEP 8 violations including a syntax error
        MockChecker.report = MagicMock()
        MockChecker.report._deferred_print = [
            "E901 SyntaxError: invalid syntax"
        ]

        has_violations, messages = check_pep8_compliance(code)
        self.assertTrue(has_violations)
        self.assertEqual(len(messages), 2)  # 1 summary message + 1 error message
        self.assertEqual(messages[0], 'The Code has 1 PEP 8 violations:')
        self.assertEqual(messages[1], 'E901 SyntaxError: invalid syntax')

if __name__ == '__main__':
    unittest.main()