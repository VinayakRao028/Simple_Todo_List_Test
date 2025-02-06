import pycodestyle

def check_pep8_compliance(script_code: str) -> tuple[bool, list[str]]:
    """
    Check if the given script code complies with PEP 8 style guidelines.

    Args:
        script_code (str): The Python code to be checked.

    Returns:
        tuple[bool, list[str]]: A tuple containing a boolean indicating if there are violations
                                and a list of messages describing the result.
    """
    style = pycodestyle.StyleGuide(quiet=True)
    report = pycodestyle.Checker("<string>", script_code.splitlines())

    report.check_all()
    errors = list(report.report._deferred_print)

    if not errors:
        msg = ['The code follows PEP 8 style guidelines.']
        return False, msg
    else:
        msg = [f'The code has {len(errors)} PEP 8 violations:']
        for error in errors:
            msg.append(str(error))
        return True, msg

# Example usage:
# if __name__ == "__main__":
#     example_code = """
# def ROUND(AMT, PWR, SWT%):
#   return int((AMT + sgn(amt) * .00000001 + SGN(AMT) * SWT% * 5 / (PWR * 10)) * PWR) / PWR
# """
#     has_violations, messages = check_pep8_compliance(example_code)
#     for message in messages:
#         print(message)