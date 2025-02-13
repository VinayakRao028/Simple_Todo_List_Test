# Simple Todo List Application

A comprehensive Todo List application with both frontend and backend components. This project allows users to manage tasks, including nested subtasks, with a clean and responsive user interface.

## Technologies Used

### Backend
- Python
- Flask
- SQLAlchemy
- Flask-RESTful
- Flask-CORS

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 4.5.0
- jQuery 3.5.1
- Popper.js 1.16.0
- Font Awesome

### Database
- SQLite (or PostgreSQL - to be confirmed)

## Project Structure

```
/app/Simple_Todo_List_Test_Converted
├── config
│   ├── package.json
│   └── requirements.txt
├── docs
│   └── README.md
├── src
│   ├── backend
│   │   ├── app
│   │   │   ├── __init__.py
│   │   │   ├── controllers
│   │   │   ├── models
│   │   │   │   ├── country.py
│   │   │   │   └── state.py
│   │   │   └── views
│   │   ├── tests
│   │   │   └── test_models
│   │   │       ├── test_country.py
│   │   │       └── test_state.py
│   │   └── utils
│   │       ├── prep.py
│   │       └── prep_test.py
│   └── frontend
│       ├── js
│       │   ├── script.js
│       │   └── type_test.js
│       ├── public
│       │   ├── css
│       │   │   └── style.css
│       │   └── index.html
│       └── tests
│           └── test_script.js
└── tests
```

## Setup Instructions

### Backend Setup

1. Ensure you have Python 3.x installed on your system.
2. Navigate to the backend directory:
   ```
   cd src/backend
   ```
3. Create a virtual environment:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
5. Install the required dependencies:
   ```
   pip install -r ../../config/requirements.txt
   ```
6. Set up the database (SQLite or PostgreSQL - instructions to be added)

### Frontend Setup

1. Ensure you have Node.js installed on your system.
2. Navigate to the frontend directory:
   ```
   cd src/frontend
   ```
3. Install the required dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

## Running the Application

### Starting the Backend Server

1. Ensure you're in the backend directory and your virtual environment is activated.
2. Run the Flask application:
   ```
   python app/__init__.py
   ```
   The backend server should now be running on `http://localhost:5000` (or another specified port).

### Serving the Frontend

1. Navigate to the frontend directory.
2. Open the `index.html` file in your web browser, or use a local server to serve the frontend files.

## Features

- Add main tasks and nested subtasks
- Mark tasks as complete or incomplete
- Delete individual tasks or clear all tasks
- Responsive design for various screen sizes
- Data persistence using localStorage

## API Documentation

(To be completed with actual API endpoints and their descriptions)

## Contributing

We welcome contributions to the Simple Todo List project! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.