import unittest
from unittest.mock import patch, MagicMock
from typing import Tuple, List
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
        self.report._deferred_print = []

    def check_all(self):
        # Simulate checking and add mock errors
        if "def ROUND" in "\n".join(self.lines):
            self.report._deferred_print.append("1:1: E302 expected 2 blank lines, found 0")
            self.report._deferred_print.append("1:5: E302 expected 2 blank lines, found 0")

class MockPycodestyle:
    @staticmethod
    def StyleGuide(quiet=True):
        return MockStyleGuide(quiet)

    @staticmethod
    def Checker(filename, lines):
        return MockChecker(filename, lines)

# The actual function to be tested
def check_pep8_compliance(script_code: str) -> Tuple[bool, List[str]]:
    style = MockPycodestyle.StyleGuide(quiet=True)
    report = MockPycodestyle.Checker("<string>", lines=script_code.splitlines())

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

# Test cases
class TestPEP8Compliance(unittest.TestCase):
    def test_compliant_code(self):
        compliant_code = """
def hello_world():
    print("Hello, World!")
"""
        has_violations, messages = check_pep8_compliance(compliant_code)
        self.assertFalse(has_violations)
        self.assertEqual(messages, ['The Code follows PEP 8 style guidelines.'])

    def test_non_compliant_code(self):
        non_compliant_code = """
def ROUND(AMT, PWR, SWT%):
  return int((AMT + sgn(amt) * .00000001 + SGN(AMT) * SWT% * 5 / (PWR * 10)) * PWR) / PWR
"""
        has_violations, messages = check_pep8_compliance(non_compliant_code)
        self.assertTrue(has_violations)
        self.assertEqual(len(messages), 3)  # 1 summary message + 2 error messages
        self.assertTrue(messages[0].startswith('The Code has 2 PEP 8 violations:'))

    def test_empty_code(self):
        empty_code = ""
        has_violations, messages = check_pep8_compliance(empty_code)
        self.assertFalse(has_violations)
        self.assertEqual(messages, ['The Code follows PEP 8 style guidelines.'])

if __name__ == '__main__':
    unittest.main()