import pycodestyle

def check_pep8_compliance(script_code):
    """
    Check the given script code for PEP 8 compliance.

    Args:
    script_code (str): The Python code to be checked.

    Returns:
    tuple: A boolean indicating if there are violations and a list of messages.
    """
    style = pycodestyle.StyleGuide(quiet=True)
    report = pycodestyle.Checker("<string>", script_code)

    report.check_all()
    errors = list(report.report._deferred_print)

    if not errors:
        msg = ['The Code Follows PEP 8 style guidelines.']
        return False, msg
    else:
        msg = [f'The Code has {len(errors)} PEP 8 violations:']
        return True, msg

# Uncomment the following lines for testing the function
# if __name__ == "__main__":
#     test_code = """
# def ROUND(AMT, PWR, SWT%):
#   return int((AMT + sgn(amt) * .00000001 + SGN(AMT) * SWT% * 5 / (PWR * 10)) * PWR) / PWR
# """
#     has_violations, messages = check_pep8_compliance(test_code)
#     print(messages[0])