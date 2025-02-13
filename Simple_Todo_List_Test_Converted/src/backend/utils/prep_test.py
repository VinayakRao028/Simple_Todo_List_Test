import unittest
import os
from unittest.mock import mock_open, patch

class TestRequirementsFile(unittest.TestCase):
    def setUp(self):
        self.file_path = 'Simple_Todo_List_Test_Converted/config/requirements.txt'

    @patch('os.path.exists')
    def test_requirements_file_exists(self, mock_exists):
        mock_exists.return_value = True
        self.assertTrue(os.path.exists(self.file_path))

    @patch('builtins.open', new_callable=mock_open, read_data='')
    def test_requirements_file_is_empty(self, mock_file):
        with open(self.file_path, 'r') as f:
            content = f.read()
        self.assertEqual(content, '')

    @patch('os.path.exists')
    def test_requirements_file_does_not_exist(self, mock_exists):
        mock_exists.return_value = False
        self.assertFalse(os.path.exists(self.file_path))

if __name__ == '__main__':
    unittest.main()