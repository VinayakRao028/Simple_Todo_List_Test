import unittest
from backend.src.utils.prep import check_pep8_compliance

class TestPEP8Compliance(unittest.TestCase):
    def test_compliant_code(self):
        compliant_code = """
def hello_world():
    print("Hello, World!")
"""
        result, messages = check_pep8_compliance(compliant_code)
        self.assertFalse(result, "Code should be PEP 8 compliant")
        self.assertEqual(messages, ["Code is PEP 8 compliant."], "Unexpected message for compliant code")

    def test_non_compliant_code(self):
        non_compliant_code = """
def hello_world():
    print ('Hello, World!')
"""
        result, messages = check_pep8_compliance(non_compliant_code)
        self.assertTrue(result, "Code should not be PEP 8 compliant")
        self.assertGreater(len(messages), 1, "Should have at least one violation message")

    def test_empty_input(self):
        result, messages = check_pep8_compliance("")
        self.assertFalse(result, "Empty input should be considered compliant")
        self.assertEqual(messages, ["Code is PEP 8 compliant."], "Unexpected message for empty input")

    def test_long_line(self):
        long_line_code = "print('This is a very long line that exceeds the PEP 8 recommended maximum line length of 79 characters')"
        result, messages = check_pep8_compliance(long_line_code)
        self.assertTrue(result, "Long line should violate PEP 8")
        self.assertTrue(any("line too long" in msg.lower() for msg in messages), "Should have a message about line length")

    def test_complex_code_sample(self):
        complex_code = """
import sys

def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

if __name__ == "__main__":
    try:
        n = int(sys.argv[1])
        result = calculate_fibonacci(n)
        print(f"The first {n} Fibonacci numbers are: {result}")
    except (IndexError, ValueError):
        print("Please provide a valid positive integer as an argument.")
"""
        result, messages = check_pep8_compliance(complex_code)
        self.assertFalse(result, "Complex code should be PEP 8 compliant")
        self.assertEqual(messages, ["Code is PEP 8 compliant."], "Unexpected message for complex compliant code")

if __name__ == '__main__':
    unittest.main()