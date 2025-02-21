import json
import time
from typing import Dict, Any
from anthropic import AnthropicVertex
from flask import jsonify
import config
import logging

# Constants for JSON parsing
JSON_CODE_START = "