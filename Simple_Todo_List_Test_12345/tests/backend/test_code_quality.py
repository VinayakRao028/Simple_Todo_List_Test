import pytest
from src.utils.code_quality import check_pep8_compliance
from unittest.mock import patch
import pycodestyle

@pytest.fixture
def sample_code():
    """Fixture providing a sample of PEP 8 compliant code."""
    return """
def hello_world():
    print("Hello, World!")
"""

def test_pep8_compliant_code(sample_code):
    """Test that PEP 8 compliant code passes the check."""
    result, messages = check_pep8_compliance(sample_code)
    assert result == False, "Expected no PEP 8 violations"
    assert len(messages) == 1, "Expected one message"
    assert "No PEP 8 violations found" in messages[0]

def test_pep8_non_compliant_code():
    """Test that non-compliant code is correctly identified."""
    code = """
def hello_world():
 print("Hello, World!")
"""
    result, messages = check_pep8_compliance(code)
    assert result == True, "Expected PEP 8 violations"
    assert len(messages) > 0, "Expected violation messages"
    assert any("E111" in msg for msg in messages), "Expected indentation error"

def test_empty_string():
    """Test the function's behavior with an empty string input."""
    result, messages = check_pep8_compliance("")
    assert result == False, "Expected no PEP 8 violations for empty string"
    assert len(messages) == 1, "Expected one message"
    assert "No PEP 8 violations found" in messages[0]

def test_invalid_python_code():
    """Test the function's response to invalid Python code."""
    code = "This is not valid Python code"
    result, messages = check_pep8_compliance(code)
    assert result == True, "Expected violations for invalid Python code"
    assert len(messages) > 0, "Expected error messages"

def test_multiple_violations():
    """Test detection of multiple PEP 8 violations."""
    code = """
def bad_function( ):
    x=1
    y= 2
    print(x+y)
"""
    result, messages = check_pep8_compliance(code)
    assert result == True, "Expected multiple PEP 8 violations"
    assert len(messages) > 2, "Expected multiple violation messages"
    violation_codes = set(msg.split()[0] for msg in messages if ':' in msg)
    assert len(violation_codes) > 1, "Expected different types of violations"

def test_large_code_block():
    """Test the function's ability to handle large code blocks."""
    code = "\n".join([f"def function_{i}():" for i in range(100)])
    result, messages = check_pep8_compliance(code)
    assert result == False, "Expected no PEP 8 violations for valid large code block"
    assert len(messages) == 1, "Expected one message"
    assert "No PEP 8 violations found" in messages[0]

@patch('pycodestyle.Checker')
def test_error_handling(mock_checker):
    """Test the function's error handling capabilities."""
    mock_checker.return_value.check_all.side_effect = Exception("Test exception")
    
    with pytest.raises(Exception):
        check_pep8_compliance("def test():\n    pass")