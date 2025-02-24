"""
This module initializes the services package for the portfolio application.
It may include imports of specific service modules or define any package-level variables or functions.
"""

# Import any necessary modules or specific services here
from .data_service import DataService

# You can define any package-level variables or functions here if needed

# Example of a package-level function (if required)
def get_data_service():
    """
    Factory function to create and return a DataService instance.
    This is just an example and can be modified or removed based on actual requirements.
    """
    return DataService()