# Simple Todo List Application

This project is a simple todo list application with a Python backend and JavaScript frontend. It allows users to create, manage, and organize tasks and subtasks.

## Project Structure

```
/app/Simple_Todo_List_Test_6789
├── README.md
├── Simple_Todo_List_Test.json
├── backend
│   ├── requirements.txt
│   └── src
│       └── prep.py
├── frontend
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── script.js
│       └── styles
│           └── style.css
├── tests
│   ├── test_prep.py
│   └── test_script.js
└── typeTest.ts
```

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm 6+

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

## Running the Application

### Start the Backend

1. From the root directory, navigate to the backend/src directory:
   ```
   cd backend/src
   ```

2. Run the Python server:
   ```
   python prep.py
   ```

### Start the Frontend

1. From the root directory, navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open your browser and visit `http://localhost:3000` (or the port specified by your frontend setup).

## Running Tests

### Backend Tests

1. From the root directory, navigate to the tests directory:
   ```
   cd tests
   ```

2. Run the Python tests:
   ```
   python -m unittest test_prep.py
   ```

### Frontend Tests

1. From the root directory, navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Run the JavaScript tests:
   ```
   npm test
   ```

## Additional Information

- The `prep.py` file in the backend contains functionality to check PEP 8 compliance of Python code.
- The frontend uses HTML, CSS, and JavaScript to create a responsive todo list application.
- The application supports nested subtasks and uses local storage for data persistence.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.