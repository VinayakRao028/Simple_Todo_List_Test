# Simple Todo List Application

This project is a full-stack Todo List application that allows users to create, manage, and organize their tasks efficiently. It features a responsive frontend built with TypeScript and Vite, and a Python backend for robust task management.

## Technologies Used

### Frontend
- TypeScript
- Vite
- Bootstrap 5.3.0
- Font Awesome 6.4.0

### Backend
- Python
- pycodestyle (for code quality checks)

## Project Structure

```
/Simple_Todo_List_Test_12345
├── README.md
├── backend
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── src
│       └── utils
│           └── code_quality.py
├── docs
├── frontend
│   ├── package.json
│   ├── public
│   │   └── assets
│   ├── src
│   │   ├── components
│   │   ├── index.html
│   │   ├── scripts
│   │   │   ├── main.js
│   │   │   └── typeTest.ts
│   │   └── styles
│   │       └── main.css
│   └── tsconfig.json
└── tests
    ├── backend
    │   └── test_code_quality.py
    └── frontend
        ├── main.test.js
        └── typeTest.test.ts
```

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

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

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Running the Application

1. Start the backend server (from the backend directory):
   ```
   python src/main.py
   ```

2. In a separate terminal, start the frontend development server (from the frontend directory):
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Testing

### Frontend Tests

Run frontend tests using the following command in the frontend directory:

```
npm test
```

### Backend Tests

Run backend tests using the following command in the backend directory:

```
python -m pytest
```

## Code Quality

We use pycodestyle to ensure our Python code adheres to PEP 8 standards. To check code quality, run:

```
python src/utils/code_quality.py
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.