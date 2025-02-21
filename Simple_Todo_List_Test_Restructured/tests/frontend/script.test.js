// script.test.js

// Mock DOM elements
const mockDOM = {
  upperLi: document.createElement('li'),
  innerLi: document.createElement('li'),
  mainForm: document.createElement('form'),
  mainInput: document.createElement('input'),
  mainList: document.createElement('ul'),
  delAll: document.createElement('button')
};

// Mock localStorage
const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

// Mock alert function
global.alert = jest.fn();

// Import the functions to be tested
const {
  initializeApp,
  addNewItem,
  handleTaskActions,
  deleteAllTasks,
  loadTasksFromLocalStorage,
  loadInnerTasksFromLocalStorage,
  saveTaskToLocalStorage,
  removeTaskFromLocalStorage,
  saveInnerTaskToLocalStorage,
  removeInnerTasksFromLocalStorage,
  removeInnerTaskFromLocalStorage,
  updateTaskCheckInLocalStorage,
  updateInnerTaskCheckInLocalStorage
} = require('./script');

// Mock implementation of required functions
jest.mock('./script', () => ({
  initializeApp: jest.fn(),
  addNewItem: jest.fn(),
  handleTaskActions: jest.fn(),
  deleteAllTasks: jest.fn(),
  loadTasksFromLocalStorage: jest.fn(),
  loadInnerTasksFromLocalStorage: jest.fn(),
  saveTaskToLocalStorage: jest.fn(),
  removeTaskFromLocalStorage: jest.fn(),
  saveInnerTaskToLocalStorage: jest.fn(),
  removeInnerTasksFromLocalStorage: jest.fn(),
  removeInnerTaskFromLocalStorage: jest.fn(),
  updateTaskCheckInLocalStorage: jest.fn(),
  updateInnerTaskCheckInLocalStorage: jest.fn()
}));

describe('Todo List Application', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset mock DOM elements
    Object.keys(mockDOM).forEach(key => {
      mockDOM[key] = document.createElement(mockDOM[key].tagName);
    });
    
    // Set up mock localStorage
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    localStorage.clear();
    
    // Reset global variables
    global.allTasks = [];
    global.innerTasks = [];
    global.count = 1;
  });

  test('initializeApp should set up event listeners and load data', () => {
    initializeApp();
    
    expect(loadTasksFromLocalStorage).toHaveBeenCalled();
    expect(loadInnerTasksFromLocalStorage).toHaveBeenCalled();
  });

  test('addNewItem should create a new task', () => {
    const event = { preventDefault: jest.fn() };
    mockDOM.mainInput.value = 'New Task';
    
    addNewItem(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(saveTaskToLocalStorage).toHaveBeenCalledWith('New Task', true);
  });

  test('addNewItem should not create a duplicate task', () => {
    const event = { preventDefault: jest.fn() };
    mockDOM.mainInput.value = 'Existing Task';
    localStorage.setItem('allTasks', JSON.stringify([{ text: 'Existing Task', check: false }]));
    
    addNewItem(event);
    
    expect(alert).toHaveBeenCalledWith('Task Already Added');
    expect(saveTaskToLocalStorage).not.toHaveBeenCalled();
  });

  test('handleTaskActions should delete a task', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        classList: { contains: jest.fn().mockReturnValue(true) },
        parentElement: {
          children: [{ innerText: 'Task to Delete' }],
          remove: jest.fn()
        }
      }
    };
    
    handleTaskActions(mockEvent);
    
    expect(removeTaskFromLocalStorage).toHaveBeenCalledWith('Task to Delete');
    expect(removeInnerTasksFromLocalStorage).toHaveBeenCalledWith('Task to Delete');
    expect(mockEvent.target.parentElement.remove).toHaveBeenCalled();
  });

  test('deleteAllTasks should clear all tasks', () => {
    const event = { preventDefault: jest.fn() };
    mockDOM.mainList.children[0] = {
      children: [
        document.createElement('li'),
        document.createElement('li'),
        document.createElement('li')
      ],
      removeChild: jest.fn()
    };
    
    deleteAllTasks(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('allTasks');
    expect(localStorage.removeItem).toHaveBeenCalledWith('innerTasks');
    expect(mockDOM.mainList.children[0].removeChild).toHaveBeenCalledTimes(2);
  });

  test('loadTasksFromLocalStorage should populate tasks from localStorage', () => {
    localStorage.setItem('allTasks', JSON.stringify([
      { text: 'Task 1', check: false },
      { text: 'Task 2', check: true }
    ]));
    
    loadTasksFromLocalStorage();
    
    expect(global.allTasks).toEqual([
      { text: 'Task 1', check: false },
      { text: 'Task 2', check: true }
    ]);
  });

  test('saveTaskToLocalStorage should add a new task to localStorage', () => {
    saveTaskToLocalStorage('New Task', true);
    
    const storedTasks = JSON.parse(localStorage.getItem('allTasks'));
    expect(storedTasks).toContainEqual({ text: 'New Task', check: false });
  });

  test('removeTaskFromLocalStorage should remove a task from localStorage', () => {
    localStorage.setItem('allTasks', JSON.stringify([
      { text: 'Task 1', check: false },
      { text: 'Task 2', check: true }
    ]));
    
    removeTaskFromLocalStorage('Task 1');
    
    const storedTasks = JSON.parse(localStorage.getItem('allTasks'));
    expect(storedTasks).toEqual([{ text: 'Task 2', check: true }]);
  });

  test('updateTaskCheckInLocalStorage should update task check status', () => {
    localStorage.setItem('allTasks', JSON.stringify([
      { text: 'Task 1', check: false }
    ]));
    
    updateTaskCheckInLocalStorage('Task 1', true);
    
    const storedTasks = JSON.parse(localStorage.getItem('allTasks'));
    expect(storedTasks[0].check).toBe(true);
  });

  // Add more tests for inner tasks, edge cases, and other functions...
});