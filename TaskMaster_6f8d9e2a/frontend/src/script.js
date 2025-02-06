// Array to store all tasks
let allTasks = [];

// Array to store inner tasks
let innerTasks = [];

// Counter for unique collapse IDs
let count = 1;

// DOM element references
const upperLi = document.getElementById("upperLi");
const innerLi = document.getElementById("innerLi");
const mainForm = document.getElementById("addingForm");
const mainInput = mainForm.children[0];
const mainList = document.getElementById("mainList");
const delAll = document.getElementById("delAll");

// Initialize event listeners and load data from localStorage
initializeApp();

// Function to set up event listeners and load initial data
function initializeApp() {
  eventListeners();
  loadLS();
  loadInnerTasks();
}

// Set up all event listeners
function eventListeners() {
  mainForm.addEventListener("submit", addNewItem);
  mainList.addEventListener("click", taskStufs);
  delAll.addEventListener("click", deleteAll);
}

// Create a new task element
function createNewTask(text, check = false) {
  const newLi = upperLi.cloneNode(true);
  newLi.classList.remove("d-none");
  newLi.removeAttribute("id");

  newLi.children[0].setAttribute("href", `#collapse${count}`);
  newLi.children[0].classList.toggle("line-throught", check);
  newLi.children[0].innerText = text;
  newLi.children[3].setAttribute("id", `collapse${count}`);

  mainList.children[0].appendChild(newLi);
  count++;
  mainInput.value = "";
}

// Add a new task
function addNewItem(e) {
  e.preventDefault();
  const taskText = mainInput.value.trim();

  if (taskText) {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    if (!allTasks.some(item => item.text === taskText)) {
      createNewTask(taskText);
      saveLS(taskText, 1);
    } else {
      alert("Task Already Added");
    }
  }
}

// Add an inner task
function addInnerTask(upperText, mainText, check = false) {
  const tempLi = innerLi.cloneNode(true);
  tempLi.removeAttribute("id");

  tempLi.childNodes.forEach((item, index) => {
    if (index === 3 || index === 5) {
      item.classList.remove("d-none");
    }
  });

  tempLi.children[0].innerText = mainText;
  tempLi.children[0].classList.toggle("line-throught", check);

  const tempList = Array.from(mainList.children[0].children)
    .find(child => child.children[0].innerText === upperText);

  if (tempList) {
    const insertionPoint = tempList.lastElementChild.firstElementChild.firstElementChild;
    insertionPoint.insertBefore(tempLi, insertionPoint.lastElementChild);
  }
}

// Handle task-related actions (delete, check, add inner task)
function taskStufs(e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains("delete-item")) {
    handleDeleteItem(target);
  } else if (target.classList.contains("delete-inner-item")) {
    handleDeleteInnerItem(target);
  } else if (target.classList.contains("check")) {
    handleCheckItem(target);
  } else if (target.classList.contains("inner-check")) {
    handleInnerCheckItem(target);
  } else if (target.classList.contains("btn-add-inner-task") || target.classList.contains("i-add-inner-task")) {
    handleAddInnerTask(target);
  }
}

// Handle deletion of a main task
function handleDeleteItem(target) {
  const text = target.parentElement.children[0].innerText;
  saveLS(text, 0);
  removeInnerTasks(text);
  target.parentElement.remove();
}

// Handle deletion of an inner task
function handleDeleteInnerItem(target) {
  const upperText = target.closest('.collapse').parentElement.children[0].innerText;
  saveInnerTasks(target.parentElement.children[0].innerText, 0, upperText);
  target.parentElement.remove();
}

// Handle checking/unchecking a main task
function handleCheckItem(target) {
  const taskText = target.parentElement.children[0];
  const isChecked = taskText.classList.toggle("line-throught");
  updateTaskCheckStatus(taskText.innerText, isChecked);
}

// Handle checking/unchecking an inner task
function handleInnerCheckItem(target) {
  const taskText = target.parentElement.children[0];
  const upperText = target.closest('.collapse').parentElement.children[0].innerText;
  const isChecked = taskText.classList.toggle("line-throught");
  updateInnerTaskCheckStatus(taskText.innerText, upperText, isChecked);
}

// Handle adding a new inner task
function handleAddInnerTask(target) {
  const inputElement = target.classList.contains("btn-add-inner-task") 
    ? target.parentElement.childNodes[1] 
    : target.parentElement.parentElement.childNodes[1];
  
  const text = inputElement.value.trim();
  if (text) {
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    addNewInnerTask(upperText, text);
    inputElement.value = "";
  }
}

// Add a new inner task and save it
function addNewInnerTask(upperText, text) {
  innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  if (!innerTasks.some(item => item.mainText === text && item.upperTaskText === upperText)) {
    addInnerTask(upperText, text);
    saveInnerTasks({ upperTaskText: upperText, mainText: text, check: false }, 1);
  } else {
    alert("Inner Task Already Added");
  }
}

// Delete all tasks
function deleteAll(e) {
  e.preventDefault();
  const list = e.target.closest('.container').querySelector('#mainList').children[0];
  while (list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
  saveLS("", -1);
  saveInnerTasks("", -1);
}

// Load main tasks from localStorage
function loadLS() {
  allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  allTasks.forEach(item => {
    if (item.text) {
      createNewTask(item.text, item.check);
    }
  });
}

// Load inner tasks from localStorage
function loadInnerTasks() {
  innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  innerTasks.forEach(item => {
    if (item.mainText) {
      addInnerTask(item.upperTaskText, item.mainText, item.check);
    }
  });
}

// Save main tasks to localStorage
function saveLS(text, index) {
  let tasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  
  if (index === -1) {
    localStorage.removeItem("allTasks");
    allTasks = [];
  } else if (index === 0) {
    tasks = tasks.filter(item => item.text !== text);
    removeInnerTasks(text);
  } else if (index === 1) {
    tasks.push({ text, check: false });
  }
  
  localStorage.setItem("allTasks", JSON.stringify(tasks));
}

// Save inner tasks to localStorage
function saveInnerTasks(item, index, upperText = "") {
  let tasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  
  if (index === -1) {
    localStorage.removeItem("innerTasks");
    innerTasks = [];
  } else if (index === 0) {
    tasks = tasks.filter(task => !(task.mainText === item && task.upperTaskText === upperText));
  } else if (index === 1) {
    tasks.push(item);
  }
  
  localStorage.setItem("innerTasks", JSON.stringify(tasks));
}

// Remove all inner tasks associated with a main task
function removeInnerTasks(upperText) {
  let tasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  tasks = tasks.filter(task => task.upperTaskText !== upperText);
  localStorage.setItem("innerTasks", JSON.stringify(tasks));
}

// Update the check status of a main task in localStorage
function updateTaskCheckStatus(text, isChecked) {
  let tasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  const taskIndex = tasks.findIndex(item => item.text === text);
  if (taskIndex !== -1) {
    tasks[taskIndex].check = isChecked;
    localStorage.setItem("allTasks", JSON.stringify(tasks));
  }
}

// Update the check status of an inner task in localStorage
function updateInnerTaskCheckStatus(text, upperText, isChecked) {
  let tasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  const taskIndex = tasks.findIndex(item => item.mainText === text && item.upperTaskText === upperText);
  if (taskIndex !== -1) {
    tasks[taskIndex].check = isChecked;
    localStorage.setItem("innerTasks", JSON.stringify(tasks));
  }
}