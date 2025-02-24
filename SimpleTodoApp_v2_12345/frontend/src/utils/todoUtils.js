// TodoDataManager.js

class TodoDataManager {
  constructor() {
    this.allTasks = [];
    this.innerTasks = [];
    this.loadTasks();
  }

  loadTasks() {
    try {
      this.allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
      this.innerTasks = JSON.parse(localStorage.getItem('innerTasks')) || [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      this.allTasks = [];
      this.innerTasks = [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
      localStorage.setItem('innerTasks', JSON.stringify(this.innerTasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  addTask(text) {
    const newTask = { text, check: false };
    this.allTasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  deleteTask(text) {
    this.allTasks = this.allTasks.filter(task => task.text !== text);
    this.innerTasks = this.innerTasks.filter(task => task.upperTaskText !== text);
    this.saveTasks();
  }

  toggleTaskCheck(text) {
    const task = this.allTasks.find(task => task.text === text);
    if (task) {
      task.check = !task.check;
      this.saveTasks();
    }
    return task;
  }

  addInnerTask(upperText, mainText) {
    const newInnerTask = { upperTaskText: upperText, mainText, check: false };
    this.innerTasks.push(newInnerTask);
    this.saveTasks();
    return newInnerTask;
  }

  deleteInnerTask(upperText, mainText) {
    this.innerTasks = this.innerTasks.filter(
      task => !(task.upperTaskText === upperText && task.mainText === mainText)
    );
    this.saveTasks();
  }

  toggleInnerTaskCheck(upperText, mainText) {
    const task = this.innerTasks.find(
      task => task.upperTaskText === upperText && task.mainText === mainText
    );
    if (task) {
      task.check = !task.check;
      this.saveTasks();
    }
    return task;
  }

  deleteAllTasks() {
    this.allTasks = [];
    this.innerTasks = [];
    this.saveTasks();
  }
}

export default TodoDataManager;

// todoUtils.js

import TodoDataManager from './TodoDataManager';

const dataManager = new TodoDataManager();

let count = 1; // Counter for unique collapse IDs

// DOM element references
const upperLi = document.getElementById("upperLi");
const innerLi = document.getElementById("innerLi");
const mainForm = document.getElementById("addingForm");
const mainInput = mainForm.children[0];
const mainList = document.getElementById("mainList");
const delAll = document.getElementById("delAll");

// Initialize event listeners and load data
function init() {
  eventListeners();
  loadTasks();
}

// Set up event listeners
function eventListeners() {
  mainForm.addEventListener("submit", addNewItem);
  mainList.addEventListener("click", taskStuff);
  delAll.addEventListener("click", deleteAll);
}

// Create a new task element
function createNewTask(text, check = false) {
  const newLi = upperLi.cloneNode(true);
  newLi.classList.remove("d-none");
  newLi.removeAttribute("id");
  newLi.querySelector("a").setAttribute("href", `#collapse${count}`);
  newLi.querySelector("a").classList.toggle("line-through", check);
  newLi.querySelector("a").textContent = text;
  newLi.querySelector(".collapse").setAttribute("id", `collapse${count}`);
  mainList.firstElementChild.appendChild(newLi);
  count++;
  mainInput.value = "";
}

// Add a new task
function addNewItem(e) {
  e.preventDefault();
  const taskText = mainInput.value.trim();
  if (taskText) {
    if (!dataManager.allTasks.some(item => item.text === taskText)) {
      const newTask = dataManager.addTask(taskText);
      createNewTask(newTask.text, newTask.check);
    } else {
      alert("Task Already Added");
    }
  }
}

// Add an inner task
function addInnerTask(upperText, mainText, check = false) {
  const tempLi = innerLi.cloneNode(true);
  tempLi.removeAttribute("id");
  tempLi.querySelectorAll(".d-none").forEach(el => el.classList.remove("d-none"));
  tempLi.querySelector("span").textContent = mainText;
  tempLi.querySelector("span").classList.toggle("line-through", check);

  const parentList = Array.from(mainList.firstElementChild.children)
    .find(el => el.querySelector("a").textContent === upperText);
  
  if (parentList) {
    const innerTaskList = parentList.querySelector("ul");
    innerTaskList.insertBefore(tempLi, innerTaskList.lastElementChild);
  }
}

// Handle task-related actions (delete, check, add inner task)
function taskStuff(e) {
  const target = e.target;

  if (target.classList.contains("delete-item")) {
    handleDeleteItem(target);
  } else if (target.classList.contains("delete-inner-item")) {
    handleDeleteInnerItem(target);
  } else if (target.classList.contains("check")) {
    handleCheck(target);
  } else if (target.classList.contains("inner-check")) {
    handleInnerCheck(target);
  } else if (target.classList.contains("btn-add-inner-task") || target.classList.contains("i-add-inner-task")) {
    handleAddInnerTask(target);
  }
}

// Handle deletion of a main task
function handleDeleteItem(target) {
  const text = target.parentElement.querySelector("a").textContent;
  dataManager.deleteTask(text);
  target.closest("li").remove();
}

// Handle deletion of an inner task
function handleDeleteInnerItem(target) {
  const upperText = target.closest(".collapse").previousElementSibling.textContent;
  const innerText = target.previousElementSibling.textContent;
  dataManager.deleteInnerTask(upperText, innerText);
  target.closest("li").remove();
}

// Handle checking/unchecking a main task
function handleCheck(target) {
  const taskElement = target.parentElement.querySelector("a");
  const text = taskElement.textContent;
  const updatedTask = dataManager.toggleTaskCheck(text);
  if (updatedTask) {
    taskElement.classList.toggle("line-through", updatedTask.check);
  }
}

// Handle checking/unchecking an inner task
function handleInnerCheck(target) {
  const taskElement = target.previousElementSibling;
  const upperText = target.closest(".collapse").previousElementSibling.textContent;
  const innerText = taskElement.textContent;
  const updatedTask = dataManager.toggleInnerTaskCheck(upperText, innerText);
  if (updatedTask) {
    taskElement.classList.toggle("line-through", updatedTask.check);
  }
}

// Handle adding a new inner task
function handleAddInnerTask(target) {
  const input = target.closest("form").querySelector("input");
  const text = input.value.trim();
  if (text) {
    const upperText = target.closest(".collapse").previousElementSibling.textContent;
    if (!dataManager.innerTasks.some(item => item.mainText === text && item.upperTaskText === upperText)) {
      const newInnerTask = dataManager.addInnerTask(upperText, text);
      addInnerTask(upperText, newInnerTask.mainText, newInnerTask.check);
      input.value = "";
    } else {
      alert("Task Already Added");
    }
  }
}

// Delete all tasks
function deleteAll(e) {
  e.preventDefault();
  while (mainList.firstElementChild.children.length > 1) {
    mainList.firstElementChild.lastElementChild.remove();
  }
  dataManager.deleteAllTasks();
}

// Load tasks from data manager
function loadTasks() {
  dataManager.allTasks.forEach(item => createNewTask(item.text, item.check));
  dataManager.innerTasks.forEach(item => addInnerTask(item.upperTaskText, item.mainText, item.check));
}

// Initialize the application
init();

export { init };