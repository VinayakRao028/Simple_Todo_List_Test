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

// Function to initialize the application
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

// Create a new task
function createNewTask(text, check = false) {
  const newLi = upperLi.cloneNode(true);
  newLi.classList.remove("d-none");
  newLi.removeAttribute("id");

  const link = newLi.children[0];
  link.setAttribute("href", `#collapse${count}`);
  link.classList.toggle("line-throught", check);
  link.innerText = text;

  newLi.children[3].setAttribute("id", `collapse${count}`);

  mainList.children[0].appendChild(newLi);

  count++;
  mainInput.value = "";
}

// Add a new item to the task list
function addNewItem(e) {
  e.preventDefault();
  const taskText = mainInput.value.trim();

  if (taskText !== "") {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const taskExists = allTasks.some(item => item.text === taskText);

    if (taskExists) {
      alert("Task Already Added");
    } else {
      createNewTask(taskText);
      saveLS(taskText, 1);
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

  const textElement = tempLi.children[0];
  textElement.innerText = mainText;
  textElement.classList.toggle("line-throught", check);

  const parentList = Array.from(mainList.children[0].children)
    .find(child => child.children[0].innerText === upperText);

  if (parentList) {
    const insertionPoint = parentList.lastElementChild.firstElementChild.firstElementChild;
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

  const tempInnerList = JSON.parse(localStorage.getItem("innerTasks")) || [];
  tempInnerList.forEach(item => {
    if (text === item.upperTaskText) {
      saveInnerTasks(item.mainText, 0, text);
    }
  });

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

  const tmpList = JSON.parse(localStorage.getItem("allTasks")) || [];
  const taskIndex = tmpList.findIndex(item => item.text === taskText.innerText);

  if (taskIndex !== -1) {
    tmpList[taskIndex].check = isChecked;
    localStorage.setItem("allTasks", JSON.stringify(tmpList));
  }
}

// Handle checking/unchecking an inner task
function handleInnerCheckItem(target) {
  const taskText = target.parentElement.children[0];
  const isChecked = taskText.classList.toggle("line-throught");
  const upperText = target.closest('.collapse').parentElement.children[0].innerText;

  const tmp = JSON.parse(localStorage.getItem("innerTasks")) || [];
  const taskIndex = tmp.findIndex(item => 
    item.mainText === taskText.innerText && item.upperTaskText === upperText
  );

  if (taskIndex !== -1) {
    tmp[taskIndex].check = isChecked;
    localStorage.setItem("innerTasks", JSON.stringify(tmp));
  }
}

// Handle adding a new inner task
function handleAddInnerTask(target) {
  const inputElement = target.classList.contains("btn-add-inner-task") 
    ? target.parentElement.childNodes[1]
    : target.parentElement.parentElement.childNodes[1];

  const text = inputElement.value.trim();
  if (text === "") return;

  const upperText = target.closest('.collapse').parentElement.children[0].innerText;
  
  innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  const taskExists = innerTasks.some(item => 
    item.mainText === text && item.upperTaskText === upperText
  );

  if (taskExists) {
    alert("Task Already Added");
  } else {
    addInnerTask(upperText, text);
    saveInnerTasks({ upperTaskText: upperText, mainText: text, check: false }, 1);
  }

  inputElement.value = "";
}

// Delete all tasks
function deleteAll(e) {
  e.preventDefault();
  const list = e.target.closest('.card-body').querySelector('ul');
  
  while (list.children.length > 1) {
    list.lastElementChild.remove();
  }

  saveLS("", -1);
  saveInnerTasks("", -1);
}

// Load main tasks from localStorage
function loadLS() {
  allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  allTasks.forEach(item => {
    if (item.text !== "") {
      createNewTask(item.text, item.check);
    }
  });
}

// Load inner tasks from localStorage
function loadInnerTasks() {
  innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
  innerTasks.forEach(item => {
    if (item.mainText !== "") {
      addInnerTask(item.upperTaskText, item.mainText, item.check);
    }
  });
}

// Save main tasks to localStorage
function saveLS(text, index) {
  let tmp = JSON.parse(localStorage.getItem("allTasks")) || [];

  switch (index) {
    case -1:
      localStorage.removeItem("allTasks");
      allTasks = [];
      loadLS();
      break;
    case 0:
      tmp = tmp.filter(item => item.text !== text);
      localStorage.setItem("allTasks", JSON.stringify(tmp));
      
      const innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
      innerTasks.forEach(item => {
        if (item.upperTaskText === text) {
          saveInnerTasks(item, 0);
        }
      });
      break;
    case 1:
      tmp.push({ text, check: false });
      localStorage.setItem("allTasks", JSON.stringify(tmp));
      break;
  }
}

// Save inner tasks to localStorage
function saveInnerTasks(item, index, upperText = "") {
  let tmp = JSON.parse(localStorage.getItem("innerTasks")) || [];

  switch (index) {
    case -1:
      localStorage.removeItem("innerTasks");
      innerTasks = [];
      loadInnerTasks();
      break;
    case 0:
      tmp = tmp.filter(e => !(e.mainText === item && e.upperTaskText === upperText));
      localStorage.setItem("innerTasks", JSON.stringify(tmp));
      break;
    case 1:
      tmp.push(item);
      localStorage.setItem("innerTasks", JSON.stringify(tmp));
      break;
  }
}