/**
 * @fileoverview Main application logic for the Todo List
 * @note If you encounter linting errors related to shell scripts, please check for any
 * root-level scripts or pre-commit hooks that might be incorrectly processing this file.
 */

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

// Initialize event listeners and load data
initializeApp();

// Function to initialize the application
function initializeApp() {
    addEventListeners();
    loadTasks();
    loadInnerTasks();
}

// Function to add all event listeners
function addEventListeners() {
    mainForm.addEventListener("submit", addNewItem);
    mainList.addEventListener("click", handleTaskActions);
    delAll.addEventListener("click", deleteAll);
}

// Function to create a new task
function createNewTask(text, check = false) {
    const newLi = upperLi.cloneNode(true);
    newLi.classList.remove("d-none");
    newLi.removeAttribute("id");

    newLi.children[0].setAttribute("href", `#collapse${count}`);
    newLi.children[0].classList.toggle("line-through", check);
    newLi.children[0].innerText = text;
    newLi.children[3].setAttribute("id", `collapse${count}`);

    mainList.children[0].appendChild(newLi);
    count++;
    mainInput.value = "";
}

// Function to add a new item
function addNewItem(e) {
    e.preventDefault();
    const taskText = mainInput.value.trim();

    if (taskText) {
        allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
        if (!allTasks.some(item => item.text === taskText)) {
            createNewTask(taskText);
            saveTask(taskText, true);
        } else {
            alert("Task Already Added");
        }
    }
}

// Function to add an inner task
function addInnerTask(upperText, mainText, check = false) {
    const tempLi = innerLi.cloneNode(true);
    tempLi.removeAttribute("id");

    tempLi.childNodes.forEach((item, index) => {
        if (index === 3 || index === 5) {
            item.classList.remove("d-none");
        }
    });

    tempLi.children[0].innerText = mainText;
    tempLi.children[0].classList.toggle("line-through", check);

    const parentList = Array.from(mainList.children[0].children)
        .find(child => child.children[0].innerText === upperText);

    if (parentList) {
        const insertionPoint = parentList.lastElementChild.firstElementChild.firstElementChild;
        insertionPoint.insertBefore(tempLi, insertionPoint.lastElementChild);
    }
}

// Function to handle task actions (delete, check, add inner task)
function handleTaskActions(e) {
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains("delete-item")) {
        handleDeleteTask(target);
    } else if (target.classList.contains("delete-inner-item")) {
        handleDeleteInnerTask(target);
    } else if (target.classList.contains("check")) {
        handleCheckTask(target);
    } else if (target.classList.contains("inner-check")) {
        handleCheckInnerTask(target);
    } else if (target.classList.contains("btn-add-inner-task") || target.classList.contains("i-add-inner-task")) {
        handleAddInnerTask(target);
    }
}

// Function to handle deleting a task
function handleDeleteTask(target) {
    const text = target.parentElement.children[0].innerText;
    saveTask(text, false);
    removeInnerTasks(text);
    target.parentElement.remove();
}

// Function to handle deleting an inner task
function handleDeleteInnerTask(target) {
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    saveInnerTask(target.parentElement.children[0].innerText, false, upperText);
    target.parentElement.remove();
}

// Function to handle checking/unchecking a task
function handleCheckTask(target) {
    const taskText = target.parentElement.children[0];
    const isChecked = taskText.classList.toggle("line-through");
    updateTaskStatus(taskText.innerText, isChecked);
}

// Function to handle checking/unchecking an inner task
function handleCheckInnerTask(target) {
    const taskText = target.parentElement.children[0];
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    const isChecked = taskText.classList.toggle("line-through");
    updateInnerTaskStatus(taskText.innerText, isChecked, upperText);
}

// Function to handle adding an inner task
function handleAddInnerTask(target) {
    const input = target.classList.contains("btn-add-inner-task") 
        ? target.parentElement.childNodes[1] 
        : target.parentElement.parentElement.childNodes[1];
    const text = input.value.trim();

    if (text) {
        const upperText = target.closest('.collapse').parentElement.children[0].innerText;
        if (!innerTaskExists(text, upperText)) {
            addInnerTask(upperText, text);
            saveInnerTask({ upperTaskText: upperText, mainText: text, check: false }, true);
            input.value = "";
        } else {
            alert("Inner Task Already Added");
        }
    }
}

// Function to delete all tasks
function deleteAll(e) {
    e.preventDefault();
    const list = mainList.children[0];
    while (list.children.length > 1) {
        list.removeChild(list.lastChild);
    }
    localStorage.removeItem("allTasks");
    localStorage.removeItem("innerTasks");
    allTasks = [];
    innerTasks = [];
}

// Function to load tasks from localStorage
function loadTasks() {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    allTasks.forEach(item => createNewTask(item.text, item.check));
}

// Function to load inner tasks from localStorage
function loadInnerTasks() {
    innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    innerTasks.forEach(item => addInnerTask(item.upperTaskText, item.mainText, item.check));
}

// Function to save a task to localStorage
function saveTask(text, add) {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    if (add) {
        allTasks.push({ text, check: false });
    } else {
        allTasks = allTasks.filter(item => item.text !== text);
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

// Function to save an inner task to localStorage
function saveInnerTask(item, add, upperText = "") {
    innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    if (add) {
        innerTasks.push(item);
    } else {
        innerTasks = innerTasks.filter(task => 
            !(task.mainText === item && task.upperTaskText === upperText)
        );
    }
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
}

// Function to remove inner tasks associated with a deleted main task
function removeInnerTasks(upperText) {
    innerTasks = innerTasks.filter(item => item.upperTaskText !== upperText);
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
}

// Function to update the status of a task in localStorage
function updateTaskStatus(text, isChecked) {
    allTasks = allTasks.map(item => 
        item.text === text ? { ...item, check: isChecked } : item
    );
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

// Function to update the status of an inner task in localStorage
function updateInnerTaskStatus(text, isChecked, upperText) {
    innerTasks = innerTasks.map(item => 
        (item.mainText === text && item.upperTaskText === upperText) 
            ? { ...item, check: isChecked } 
            : item
    );
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
}

// Function to check if an inner task already exists
function innerTaskExists(text, upperText) {
    return innerTasks.some(item => 
        item.mainText === text && item.upperTaskText === upperText
    );
}