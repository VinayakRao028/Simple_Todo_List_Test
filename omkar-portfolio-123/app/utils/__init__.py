"""
Utility functions and classes for the portfolio application.

This module contains various helper functions and utility classes that can be used
across different parts of the application to perform common tasks or operations.
"""

import json
from typing import Dict, Any

def load_json_file(file_path: str) -> Dict[str, Any]:
    """
    Load and parse a JSON file.

    Args:
        file_path (str): The path to the JSON file.

    Returns:
        Dict[str, Any]: A dictionary containing the parsed JSON data.

    Raises:
        FileNotFoundError: If the specified file is not found.
        json.JSONDecodeError: If the file contains invalid JSON.
    """
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        raise FileNotFoundError(f"The file {file_path} was not found.")
    except json.JSONDecodeError:
        raise json.JSONDecodeError(f"The file {file_path} contains invalid JSON.")

def sanitize_input(input_string: str) -> str:
    """
    Sanitize user input to prevent XSS attacks.

    Args:
        input_string (str): The input string to sanitize.

    Returns:
        str: The sanitized input string.
    """
    return input_string.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def validate_email(email: str) -> bool:
    """
    Validate an email address.

    Args:
        email (str): The email address to validate.

    Returns:
        bool: True if the email is valid, False otherwise.
    """
    import re
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

# Add more utility functions as needed