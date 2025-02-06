'use strict';

// Module for task management
const TaskManager = (function() {
  // Private variables
  let allTasks = [];
  let innerTasks = [];
  let count = 1;

  // DOM element references
  const upperLi = document.getElementById("upperLi");
  const innerLi = document.getElementById("innerLi");
  const mainForm = document.getElementById("addingForm");
  const mainInput = mainForm.children[0];
  const mainList = document.getElementById("mainList");
  const delAll = document.getElementById("delAll");

  // Helper functions
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

  function saveLS(text, index) {
    if (index === -1) {
      localStorage.removeItem("allTasks");
      allTasks = [];
    } else if (index === 0) {
      allTasks = allTasks.filter(item => item.text !== text);
    } else if (index === 1) {
      allTasks.push({ text, check: false });
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }

  function saveInnerTasks(item, index, upperText = "") {
    if (index === -1) {
      localStorage.removeItem("innerTasks");
      innerTasks = [];
    } else if (index === 0) {
      innerTasks = innerTasks.filter(e => !(e.mainText === item && e.upperTaskText === upperText));
    } else if (index === 1) {
      innerTasks.push(item);
    }
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
  }

  function removeInnerTasksOfMainTask(upperText) {
    innerTasks = innerTasks.filter(item => item.upperTaskText !== upperText);
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
  }

  function updateTaskCheckStatus(taskText, isChecked) {
    allTasks = allTasks.map(item => 
      item.text === taskText ? { ...item, check: isChecked } : item
    );
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }

  function updateInnerTaskCheckStatus(upperText, taskText, isChecked) {
    innerTasks = innerTasks.map(item => 
      (item.upperTaskText === upperText && item.mainText === taskText) 
        ? { ...item, check: isChecked } 
        : item
    );
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
  }

  function innerTaskExists(upperText, text) {
    return innerTasks.some(item => item.mainText === text && item.upperTaskText === upperText);
  }

  // Event handler functions
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

  function handleDeleteItem(target) {
    const text = target.parentElement.children[0].innerText;
    saveLS(text, 0);
    removeInnerTasksOfMainTask(text);
    target.parentElement.remove();
  }

  function handleDeleteInnerItem(target) {
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    saveInnerTasks(target.parentElement.children[0].innerText, 0, upperText);
    target.parentElement.remove();
  }

  function handleCheckItem(target) {
    const taskText = target.parentElement.children[0].innerText;
    const isChecked = target.parentElement.children[0].classList.toggle("line-throught");
    updateTaskCheckStatus(taskText, isChecked);
  }

  function handleInnerCheckItem(target) {
    const upperText = target.closest('.collapse').parentElement.children[0].innerText;
    const taskText = target.parentElement.children[0].innerText;
    const isChecked = target.parentElement.children[0].classList.toggle("line-throught");
    updateInnerTaskCheckStatus(upperText, taskText, isChecked);
  }

  function handleAddInnerTask(target) {
    const inputElement = target.classList.contains("btn-add-inner-task") 
      ? target.parentElement.childNodes[1] 
      : target.parentElement.parentElement.childNodes[1];
    
    const text = inputElement.value.trim();
    if (text) {
      const upperText = target.closest('.collapse').parentElement.children[0].innerText;
      if (!innerTaskExists(upperText, text)) {
        addInnerTask(upperText, text);
        saveInnerTasks({ upperTaskText: upperText, mainText: text, check: false }, 1);
        inputElement.value = "";
      } else {
        alert("Task Already Added");
      }
    }
  }

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

  function deleteAll(e) {
    e.preventDefault();
    const list = mainList.children[0];
    while (list.children.length > 1) {
      list.removeChild(list.lastChild);
    }
    saveLS("", -1);
    saveInnerTasks("", -1);
  }

  // Load functions
  function loadLS() {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    allTasks.forEach(item => {
      if (item.text) {
        createNewTask(item.text, item.check);
      }
    });
  }

  function loadInnerTasks() {
    innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    innerTasks.forEach(item => {
      if (item.mainText) {
        addInnerTask(item.upperTaskText, item.mainText, item.check);
      }
    });
  }

  // Event listeners setup
  function setupEventListeners() {
    mainForm.addEventListener("submit", addNewItem);
    mainList.addEventListener("click", taskStufs);
    delAll.addEventListener("click", deleteAll);
  }

  // Initialization function
  function initializeApp() {
    setupEventListeners();
    loadLS();
    loadInnerTasks();
  }

  // Public API
  return {
    init: initializeApp
  };
})();

// Initialize the application
document.addEventListener('DOMContentLoaded', TaskManager.init);