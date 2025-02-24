import pytest
from unittest.mock import patch
from app.utils.pep8_checker import check_pep8_compliance

# Test for code with no PEP 8 violations
def test_no_pep8_violations():
    code = """
def hello_world():
    print("Hello, World!")
"""
    result, messages = check_pep8_compliance(code)
    assert result == False
    assert len(messages) == 1
    assert "No PEP 8 violations found" in messages[0]

# Test for code with PEP 8 violations
def test_with_pep8_violations():
    code = """
def hello_world():
 print("Hello, World!")
"""
    result, messages = check_pep8_compliance(code)
    assert result == True
    assert len(messages) > 0
    assert any("indentation" in msg.lower() for msg in messages)

# Test for empty input
def test_empty_input():
    result, messages = check_pep8_compliance("")
    assert result == False
    assert len(messages) == 1
    assert "No PEP 8 violations found" in messages[0]

# Test for very long input
def test_long_input():
    code = "print('x')\n" * 1000
    result, messages = check_pep8_compliance(code)
    assert result == False
    assert len(messages) == 1
    assert "No PEP 8 violations found" in messages[0]

# Test for input with syntax errors
def test_syntax_error():
    code = """
def broken_function()
    print("This has a syntax error")
"""
    result, messages = check_pep8_compliance(code)
    assert result == True
    assert len(messages) > 0
    assert any("syntax error" in msg.lower() for msg in messages)

# Parametrized test for multiple scenarios
@pytest.mark.parametrize("code,expected_result,expected_message", [
    ("def f(): pass", False, "No PEP 8 violations found"),
    ("def f():\n  pass", True, "indentation"),
    ("import os, sys", True, "multiple imports"),
])
def test_various_pep8_scenarios(code, expected_result, expected_message):
    result, messages = check_pep8_compliance(code)
    assert result == expected_result
    if expected_result:
        assert any(expected_message in msg.lower() for msg in messages)
    else:
        assert expected_message in messages[0]

# Test for specific error messages
def test_specific_error_messages():
    code = """
def  function_with_extra_space():
    CONSTANT = 'ALL_CAPS'
    variable = 'snake_case'
"""
    result, messages = check_pep8_compliance(code)
    assert result == True
    assert any("multiple spaces before operator" in msg for msg in messages)
    assert any("lowercase" in msg and "constant" in msg.lower() for msg in messages)

# Test with mocked pycodestyle
@patch('app.utils.pep8_checker.pycodestyle.Checker')
def test_mocked_pycodestyle(mock_checker):
    mock_checker.return_value.check_all.return_value = []
    result, messages = check_pep8_compliance("def f(): pass")
    assert result == False
    assert "No PEP 8 violations found" in messages[0]
    mock_checker.assert_called_once()

# Test for handling unexpected exceptions
@patch('app.utils.pep8_checker.pycodestyle.Checker')
def test_unexpected_exception(mock_checker):
    mock_checker.side_effect = Exception("Unexpected error")
    result, messages = check_pep8_compliance("def f(): pass")
    assert result == True
    assert "An error occurred while checking PEP 8 compliance" in messages[0]