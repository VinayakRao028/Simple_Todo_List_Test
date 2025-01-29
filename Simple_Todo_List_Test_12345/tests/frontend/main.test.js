// Import the functions to test
// Note: We might need to modify main.js to export these functions
import {
  initializeApp,
  addEventListeners,
  createNewTask,
  addInnerTask,
  handleTaskActions,
  loadTasks,
  loadInnerTasks,
  saveTask,
  saveInnerTask
} from '../src/scripts/main.js';

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock DOM elements
document.body.innerHTML = `
  <div id="app">
    <input id="input-task" type="text">
    <button id="add-task">Add Task</button>
    <ul id="list"></ul>
  </div>
`;

describe('Todo List Functionality', () => {
  beforeEach(() => {
    // Clear localStorage and reset DOM before each test
    localStorage.clear();
    document.body.innerHTML = `
      <div id="app">
        <input id="input-task" type="text">
        <button id="add-task">Add Task</button>
        <ul id="list"></ul>
      </div>
    `;
  });

  test('initializeApp should set up the application', () => {
    initializeApp();
    expect(document.getElementById('add-task')).not.toBeNull();
    // Add more expectations based on what initializeApp does
  });

  test('createNewTask should add a new task to the list', () => {
    const taskText = 'New Task';
    createNewTask(taskText, false);
    const listItems = document.querySelectorAll('#list li');
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain(taskText);
  });

  test('addInnerTask should add a subtask to a main task', () => {
    const mainTaskText = 'Main Task';
    const innerTaskText = 'Inner Task';
    createNewTask(mainTaskText, false);
    addInnerTask(mainTaskText, innerTaskText, false);
    const innerTasks = document.querySelectorAll('.inner-list li');
    expect(innerTasks.length).toBe(1);
    expect(innerTasks[0].textContent).toContain(innerTaskText);
  });

  test('handleTaskActions should mark a task as complete', () => {
    createNewTask('Test Task', false);
    const checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    expect(checkbox.parentElement.classList.contains('completed')).toBeTruthy();
  });

  test('saveTask should store task in localStorage', () => {
    const taskText = 'Task to save';
    saveTask(taskText, true);
    expect(localStorage.getItem('tasks')).toContain(taskText);
  });

  test('loadTasks should retrieve tasks from localStorage', () => {
    localStorage.setItem('tasks', JSON.stringify(['Task 1', 'Task 2']));
    loadTasks();
    const listItems = document.querySelectorAll('#list li');
    expect(listItems.length).toBe(2);
  });

  // Add more tests for other functions...
});