// Array to store all tasks
let allTasks = [];

// Array to store inner tasks
let innerTasks = [];

// DOM element references
const upperLi = document.getElementById("upperLi");
const innerLi = document.getElementById("innerLi");
const mainForm = document.getElementById("addingForm");
const mainInput = mainForm.children[0];
const mainList = document.getElementById("mainList");
const delAll = document.getElementById("delAll");

// Initialize event listeners and load data from local storage
initializeApp();

// Function to initialize the application
function initializeApp() {
    // Counter for unique collapse IDs
    window.count = 1;  // Using window to make it globally accessible
    addEventListeners();
    loadTasksFromLocalStorage();
    loadInnerTasksFromLocalStorage();
}

// Function to add all event listeners
function addEventListeners() {
    mainForm.addEventListener("submit", addNewItem);
    mainList.addEventListener("click", handleTaskActions);
    delAll.addEventListener("click", deleteAllTasks);
}

// Function to create a new task element
function createNewTask(text, isChecked = false) {
    const newLi = upperLi.cloneNode(true);
    newLi.classList.remove("d-none");
    newLi.removeAttribute("id");

    newLi.children[0].setAttribute("href", `#collapse${window.count}`);
    newLi.children[0].classList.toggle("line-through", isChecked);
    newLi.children[0].innerText = text;
    newLi.children[3].setAttribute("id", `collapse${window.count}`);

    mainList.children[0].appendChild(newLi);
    window.count++;
    mainInput.value = "";
}

// Function to add a new task
function addNewItem(event) {
    event.preventDefault();
    const taskText = mainInput.value.trim();

    if (taskText !== "") {
        const tasks = getFromLocalStorage("allTasks") || [];
        const taskExists = tasks.some(item => item.text === taskText);

        if (taskExists) {
            alert("Task Already Added");
        } else {
            createNewTask(taskText);
            saveTaskToLocalStorage(taskText, true);
        }
    }
}

// Function to add an inner task
function addInnerTask(upperText, mainText, isChecked = false) {
    const tempLi = innerLi.cloneNode(true);
    tempLi.removeAttribute("id");

    tempLi.childNodes.forEach((item, index) => {
        if (index === 3 || index === 5) {
            item.classList.remove("d-none");
        }
    });

    tempLi.children[0].innerText = mainText;
    tempLi.children[0].classList.toggle("line-through", isChecked);

    const parentList = Array.from(mainList.children[0].children)
        .find(item => item.children[0].innerText === upperText);

    if (parentList) {
        const insertionPoint = parentList.lastElementChild.firstElementChild.firstElementChild;
        insertionPoint.insertBefore(tempLi, insertionPoint.lastElementChild);
    }
}

// Function to remove a specific inner task from local storage
function removeInnerTaskFromLocalStorage(text, upperText) {
    const innerTasks = getFromLocalStorage("innerTasks") || [];
    const updatedInnerTasks = innerTasks.filter(item => !(item.mainText === text && item.upperTaskText === upperText));
    saveToLocalStorage("innerTasks", updatedInnerTasks);
}

// Function to handle task actions (delete, check, add inner task)
function handleTaskActions(event) {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains("delete-item")) {
        handleDeleteTask(target);
    } else if (target.classList.contains("delete-inner-item")) {
        handleDeleteInnerTask(target);
    } else if (target.classList.contains("check")) {
        handleToggleTaskCheck(target);
    } else if (target.classList.contains("inner-check")) {
        handleToggleInnerTaskCheck(target);
    } else if (target.classList.contains("btn-add-inner-task") || target.classList.contains("i-add-inner-task")) {
        handleAddInnerTask(target);
    }
}

// Function to handle deleting a task
function handleDeleteTask(target) {
    const text = target.parentElement.children[0].innerText;
    removeTaskFromLocalStorage(text);
    removeInnerTasksFromLocalStorage(text);
    target.parentElement.remove();
}

// Function to handle deleting an inner task
function handleDeleteInnerTask(target) {
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    const innerText = target.parentElement.children[0].innerText;
    removeInnerTaskFromLocalStorage(innerText, upperText);
    target.parentElement.remove();
}

// Function to handle toggling task check
function handleToggleTaskCheck(target) {
    const taskElement = target.parentElement.children[0];
    const isChecked = taskElement.classList.toggle("line-through");
    updateTaskCheckInLocalStorage(taskElement.innerText, isChecked);
}

// Function to handle toggling inner task check
function handleToggleInnerTaskCheck(target) {
    const taskElement = target.parentElement.children[0];
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    const isChecked = taskElement.classList.toggle("line-through");
    updateInnerTaskCheckInLocalStorage(taskElement.innerText, upperText, isChecked);
}

// Function to handle adding an inner task
function handleAddInnerTask(target) {
    const inputElement = target.classList.contains("btn-add-inner-task") 
        ? target.parentElement.childNodes[1] 
        : target.parentElement.parentElement.childNodes[1];
    
    const text = inputElement.value.trim();
    if (text !== "") {
        const upperText = target.closest('.collapse').parentElement.children[0].innerText;
        const innerTasks = getFromLocalStorage("innerTasks") || [];
        
        if (!innerTasks.some(item => item.mainText === text && item.upperTaskText === upperText)) {
            addInnerTask(upperText, text);
            saveInnerTaskToLocalStorage({ upperTaskText: upperText, mainText: text, check: false });
            inputElement.value = "";
        } else {
            alert("Task Already Added");
        }
    }
}

// Function to delete all tasks
function deleteAllTasks(event) {
    event.preventDefault();
    const list = mainList.children[0];
    while (list.children.length > 1) {
        list.removeChild(list.lastChild);
    }
    removeFromLocalStorage("allTasks");
    removeFromLocalStorage("innerTasks");
    allTasks = [];
    innerTasks = [];
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = getFromLocalStorage("allTasks") || [];
    allTasks = storedTasks;
    storedTasks.forEach(item => createNewTask(item.text, item.check));
}

// Function to load inner tasks from local storage
function loadInnerTasksFromLocalStorage() {
    const storedInnerTasks = getFromLocalStorage("innerTasks") || [];
    innerTasks = storedInnerTasks;
    storedInnerTasks.forEach(item => addInnerTask(item.upperTaskText, item.mainText, item.check));
}

// Function to save a task to local storage
function saveTaskToLocalStorage(text, isNew = false) {
    const tasks = getFromLocalStorage("allTasks") || [];
    if (isNew) {
        tasks.push({ text, check: false });
    } else {
        const index = tasks.findIndex(item => item.text === text);
        if (index !== -1) {
            tasks[index].check = !tasks[index].check;
        }
    }
    saveToLocalStorage("allTasks", tasks);
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(text) {
    const tasks = getFromLocalStorage("allTasks") || [];
    const updatedTasks = tasks.filter(item => item.text !== text);
    saveToLocalStorage("allTasks", updatedTasks);
}

// Function to save an inner task to local storage
function saveInnerTaskToLocalStorage(task) {
    const innerTasks = getFromLocalStorage("innerTasks") || [];
    innerTasks.push(task);
    saveToLocalStorage("innerTasks", innerTasks);
}

// Function to remove inner tasks from local storage
function removeInnerTasksFromLocalStorage(upperText) {
    const innerTasks = getFromLocalStorage("innerTasks") || [];
    const updatedInnerTasks = innerTasks.filter(item => item.upperTaskText !== upperText);
    saveToLocalStorage("innerTasks", updatedInnerTasks);
}

// Function to update task check status in local storage
function updateTaskCheckInLocalStorage(text, isChecked) {
    const tasks = getFromLocalStorage("allTasks") || [];
    const taskIndex = tasks.findIndex(item => item.text === text);
    if (taskIndex !== -1) {
        tasks[taskIndex].check = isChecked;
        saveToLocalStorage("allTasks", tasks);
    }
}

// Function to update inner task check status in local storage
function updateInnerTaskCheckInLocalStorage(text, upperText, isChecked) {
    const innerTasks = getFromLocalStorage("innerTasks") || [];
    const taskIndex = innerTasks.findIndex(item => item.mainText === text && item.upperTaskText === upperText);
    if (taskIndex !== -1) {
        innerTasks[taskIndex].check = isChecked;
        saveToLocalStorage("innerTasks", innerTasks);
    }
}

// Helper function to safely get data from local storage
function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(`Error retrieving ${key} from localStorage:`, error);
        return null;
    }
}

// Helper function to safely save data to local storage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
}

// Helper function to safely remove data from local storage
function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
    }
}