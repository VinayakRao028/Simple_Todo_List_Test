import unittest
from unittest.mock import patch, MagicMock
import json
import time

# Mock external dependencies
class MockConfig:
    LLM_PROJECT_ID = "mock-project-id"

class MockMessage:
    def __init__(self, content):
        self.content = [MagicMock(text=content)]

class MockAnthropicVertex:
    def __init__(self, region, project_id):
        self.region = region
        self.project_id = project_id
        self.messages = MagicMock()

    def create(self, **kwargs):
        if kwargs.get('system') == "":
            raise ValueError("System prompt is missing")
        if kwargs.get('messages')[0]['content'] == "trigger_error":
            raise Exception("Mocked AI service error")
        return MockMessage(json.dumps({"response": "Mocked AI response"}))

# Implement the target function
def get_validated_service_ai_response(system_prompt, user_content):
    max_retries = 3
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            if not system_prompt:
                print("System prompt is missing.")
                return {"error_code": 400, "message": "System prompt is missing."}
            
            start_time = time.time()
            LOCATION = "us-east5"
            client = MockAnthropicVertex(region=LOCATION, project_id=MockConfig.LLM_PROJECT_ID)

            code_history = [{"role": "user", "content": user_content}]
            
            try:
                message = client.messages.create(
                    temperature=0,
                    top_k=0,
                    top_p=0,
                    max_tokens=4096,
                    system=system_prompt,
                    model="claude-3-5-sonnet@20240620",
                    messages=code_history
                )
            except Exception as e:
                print(f"Error communicating with AI service: {e}")
                return {"error_code": 502, "message": "Failed to communicate with AI service."}

            ai_answer = message.content[-1].text

            json_extracted = ai_answer
            return json.loads(json_extracted)

        except json.JSONDecodeError:
            print("Invalid JSON response from AI service.")
            retry_count += 1
            if retry_count == max_retries:
                return {"error_code": 500, "message": "Failed to parse AI response after multiple attempts."}
        except Exception as e:
            print(f"Unexpected error: {e}")
            return {"error_code": 500, "message": "An unexpected error occurred."}

class TestGetValidatedServiceAIResponse(unittest.TestCase):
    @patch('builtins.print')
    def test_successful_response(self, mock_print):
        system_prompt = "You are a helpful AI assistant."
        user_content = "Hello, AI!"
        result = get_validated_service_ai_response(system_prompt, user_content)
        self.assertEqual(result, {"response": "Mocked AI response"})

    @patch('builtins.print')
    def test_missing_system_prompt(self, mock_print):
        system_prompt = ""
        user_content = "Hello, AI!"
        result = get_validated_service_ai_response(system_prompt, user_content)
        self.assertEqual(result, {"error_code": 400, "message": "System prompt is missing."})
        mock_print.assert_called_with("System prompt is missing.")

    @patch('builtins.print')
    def test_ai_service_error(self, mock_print):
        system_prompt = "You are a helpful AI assistant."
        user_content = "trigger_error"
        result = get_validated_service_ai_response(system_prompt, user_content)
        self.assertEqual(result, {"error_code": 502, "message": "Failed to communicate with AI service."})
        mock_print.assert_called_with("Error communicating with AI service: Mocked AI service error")

    @patch('builtins.print')
    @patch('json.loads', side_effect=json.JSONDecodeError("Mocked JSON error", "", 0))
    def test_invalid_json_response(self, mock_json_loads, mock_print):
        system_prompt = "You are a helpful AI assistant."
        user_content = "Hello, AI!"
        result = get_validated_service_ai_response(system_prompt, user_content)
        self.assertEqual(result, {"error_code": 500, "message": "Failed to parse AI response after multiple attempts."})
        self.assertEqual(mock_print.call_count, 3)  # Called 3 times for each retry
        mock_print.assert_called_with("Invalid JSON response from AI service.")

if __name__ == '__main__':
    unittest.main()