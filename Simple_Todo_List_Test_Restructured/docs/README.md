# Simple Todo List Test Restructured

This project is a comprehensive todo list application with a microservice architecture, featuring both frontend and backend components. It demonstrates the integration of multiple technologies and services to create a robust and scalable application.

## Technologies Used

### Frontend
- TypeScript
- Vite (for building)
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Java (with Spring Boot and JPA)
- Python
- AnthropicVertex API (for AI services)

## Project Structure

The project is organized into three main directories:

- `frontend/`: Contains the TypeScript-based frontend application
- `backend/`: Houses two separate services
  - `java-service/`: A Java-based service for managing countries and states
  - `python-service/`: A Python-based service for AI functionality and code style checking
- `tests/`: Contains test files for both frontend and backend components

## Setup Instructions

### Backend Setup

#### Java Service
1. Navigate to the `backend/java-service/` directory
2. Ensure you have Java JDK 11 or later installed
3. Install Maven if not already present
4. Run `mvn clean install` to build the project and install dependencies
5. Start the service with `mvn spring-boot:run`

#### Python Service
1. Navigate to the `backend/python-service/` directory
2. Ensure you have Python 3.7 or later installed
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Start the service (command may vary based on your setup, e.g., `python src/ai_service.py`)

### Frontend Setup
1. Navigate to the `frontend/` directory
2. Ensure you have Node.js and npm installed
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Usage Instructions

1. After starting both backend services and the frontend, open your browser and navigate to `http://localhost:3000` (or the port specified by your Vite configuration)
2. You will see the todo list application interface
3. Add new tasks using the input field at the top
4. Mark tasks as complete by clicking the checkbox next to each task
5. Delete tasks using the delete button next to each task
6. Add subtasks to existing tasks using the "Add Subtask" feature

## Testing

To run the tests:

1. For backend Java tests:
   - Navigate to `backend/java-service/`
   - Run `mvn test`

2. For backend Python tests:
   - Navigate to `backend/python-service/`
   - Activate the virtual environment
   - Run `pytest`

3. For frontend tests:
   - Navigate to `frontend/`
   - Run `npm test`

## Additional Information

- The Java service provides RESTful endpoints for managing countries and states. Refer to the Swagger documentation (available at `/swagger-ui.html` when the service is running) for detailed API information.
- The Python service includes an AI-powered feature using the AnthropicVertex API. It also provides utilities for checking PEP 8 compliance of Python code.
- The frontend implements a responsive design and uses local storage to persist todo items between sessions.

For more detailed information about each component, please refer to the individual README files in the respective directories.
```

This README.md provides a comprehensive overview of the project, including its structure, setup instructions, and usage guidelines. It covers both the frontend and backend components, mentioning the key technologies used in each part. The setup instructions are detailed enough to guide a developer through the process of getting the entire application up and running.

I've made sure to include information about testing, as there's a dedicated `tests/` directory in the project structure. I've also added a section for additional information, highlighting some of the unique features of each component, such as the AI service in the Python backend and the RESTful endpoints in the Java backend.

The content is written in Markdown format, as specified in the technology stack. It's structured with clear headings and subheadings, making it easy to navigate and read.

This README should provide a good starting point for anyone looking to understand or work with this project. However, if there are any specific details or features that need to be emphasized or added, the content can be easily modified or expanded.

</contemplator>