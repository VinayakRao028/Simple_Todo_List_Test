import unittest
from unittest.mock import patch, Mock
from backend.src.utils.prep import check_pep8_compliance

class TestPep8Compliance(unittest.TestCase):
    
    @patch('backend.src.utils.prep.pycodestyle.Checker')
    def test_valid_code(self, mock_checker):
        mock_checker.return_value.check_all.return_value = []
        code = "def hello():\n    print('Hello, World!')\n"
        result, messages = check_pep8_compliance(code)
        self.assertFalse(result)
        self.assertEqual(messages, ["The code complies with PEP 8 standards."])
    
    @patch('backend.src.utils.prep.pycodestyle.Checker')
    def test_invalid_code(self, mock_checker):
        mock_violations = [Mock(text='E201 whitespace after \'(\'')]
        mock_checker.return_value.check_all.return_value = mock_violations
        code = "def hello( ):\n    print ('Hello, World!')\n"
        result, messages = check_pep8_compliance(code)
        self.assertTrue(result)
        self.assertEqual(messages, ['E201 whitespace after \'(\''])
    
    @patch('backend.src.utils.prep.pycodestyle.Checker')
    def test_empty_string(self, mock_checker):
        mock_checker.return_value.check_all.return_value = []
        code = ""
        result, messages = check_pep8_compliance(code)
        self.assertFalse(result)
        self.assertEqual(messages, ["The code complies with PEP 8 standards."])
    
    @patch('backend.src.utils.prep.pycodestyle.Checker')
    def test_long_line(self, mock_checker):
        mock_violations = [Mock(text='E501 line too long (91 > 79 characters)')]
        mock_checker.return_value.check_all.return_value = mock_violations
        code = "print('This is a very long line that exceeds the PEP 8 recommended maximum line length of 79 characters')\n"
        result, messages = check_pep8_compliance(code)
        self.assertTrue(result)
        self.assertEqual(messages, ['E501 line too long (91 > 79 characters)'])

if __name__ == '__main__':
    unittest.main()