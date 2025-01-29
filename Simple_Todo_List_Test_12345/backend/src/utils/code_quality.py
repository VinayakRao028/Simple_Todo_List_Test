import pycodestyle
from typing import Tuple, List

def check_pep8_compliance(script_code: str) -> Tuple[bool, List[str]]:
    """
    Check the given script code for PEP 8 compliance.

    Args:
        script_code (str): The Python code to be checked.

    Returns:
        Tuple[bool, List[str]]: A tuple containing a boolean indicating if there are violations
                                and a list of messages.
    """
    style = pycodestyle.StyleGuide(quiet=True)
    report = pycodestyle.Checker("<string>", lines=script_code.splitlines())

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

# Example usage (commented out):
# if __name__ == "__main__":
#     file_path = """
# def ROUND(AMT, PWR, SWT%):
#   return int((AMT + sgn(amt) * .00000001 + SGN(AMT) * SWT% * 5 / (PWR * 10)) * PWR) / PWR
# """
#     has_violations, messages = check_pep8_compliance(file_path)
#     for message in messages:
#         print(message)