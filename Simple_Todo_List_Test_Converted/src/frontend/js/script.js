// Global variables
let allTasks = [];
let innerTasks = [];
let count = 1; // for identical collapse id

// DOM elements
let upperLi, innerLi, mainForm, mainInput, mainList, delAll;

// Feature detection
const supportsLocalStorage = (function() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch(e) {
    return false;
  }
})();

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  upperLi = document.getElementById("upperLi");
  innerLi = document.getElementById("innerLi");
  mainForm = document.getElementById("addingForm");
  mainInput = mainForm.children[0];
  mainList = document.getElementById("mainList");
  delAll = document.getElementById("delAll");

  // Event listeners
  mainForm.addEventListener("submit", addNewItem);
  mainList.addEventListener("click", handleTaskOperations);
  delAll.addEventListener("click", deleteAll);

  loadLS();
  loadInnerTasks();
});

// Create new task
function createNewTask(text, check = false) {
  const newLi = upperLi.cloneNode(true);
  newLi.classList.remove("d-none");
  newLi.removeAttribute("id");

  newLi.children[0].setAttribute("href", "#collapse" + count);
  newLi.children[0].classList.toggle("line-throught", check);
  newLi.children[0].innerText = text;
  newLi.children[3].setAttribute("id", "collapse" + count);

  mainList.children[0].appendChild(newLi);

  count++;
  mainInput.value = "";
}

// Add new item
function addNewItem(e) {
  e.preventDefault();
  const taskText = mainInput.value.trim();

  if (taskText !== "") {
    if (supportsLocalStorage) {
      allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
      const taskExists = allTasks.some(function(item) { return item.text === taskText; });

      if (taskExists) {
        alert("Task Already Added");
      } else {
        createNewTask(taskText);
        saveLS(taskText, 1);
      }
    } else {
      createNewTask(taskText);
    }
  }
}

// Add inner task
function addInnerTask(upperText, mainText, check = false) {
  const tempLi = innerLi.cloneNode(true);
  tempLi.removeAttribute("id");

  for (let i = 0; i < tempLi.childNodes.length; i++) {
    if (i === 3 || i === 5) {
      tempLi.childNodes[i].classList.remove("d-none");
    }
  }

  tempLi.children[0].innerText = mainText;
  tempLi.children[0].classList.toggle("line-throught", check);

  const tempList = Array.prototype.slice.call(mainList.children[0].children).find(function(child) {
    return child.children[0].innerText === upperText;
  });

  if (tempList) {
    const innerTaskList = tempList.lastElementChild.firstElementChild.firstElementChild;
    innerTaskList.insertBefore(tempLi, innerTaskList.lastElementChild);
  }
}

// Task operations
function handleTaskOperations(e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains("delete-item")) {
    deleteMainTask(target);
  } else if (target.classList.contains("delete-inner-item")) {
    deleteInnerTask(target);
  } else if (target.classList.contains("check")) {
    toggleMainTaskCheck(target);
  } else if (target.classList.contains("inner-check")) {
    toggleInnerTaskCheck(target);
  } else if (target.classList.contains("btn-add-inner-task") || target.classList.contains("i-add-inner-task")) {
    addNewInnerTask(target);
  }
}

// Delete main task
function deleteMainTask(target) {
  const text = target.parentElement.children[0].innerText;
  if (supportsLocalStorage) {
    saveLS(text, 0);

    const tempInnerList = JSON.parse(localStorage.getItem("innerTasks")) || [];
    tempInnerList.forEach(function(item) {
      if (text === item.upperTaskText) {
        saveInnerTasks(item.mainText, 0, text);
      }
    });
  }

  target.parentElement.remove();
}

// Delete inner task
function deleteInnerTask(target) {
  const upperText = target.closest('.collapse').parentElement.children[0].innerText;
  if (supportsLocalStorage) {
    saveInnerTasks(target.parentElement.children[0].innerText, 0, upperText);
  }
  target.parentElement.remove();
}

// Toggle main task check
function toggleMainTaskCheck(target) {
  const taskText = target.parentElement.children[0].innerText;
  const isChecked = target.parentElement.children[0].classList.toggle("line-throught");

  if (supportsLocalStorage) {
    const tmpList = JSON.parse(localStorage.getItem("allTasks")) || [];
    const taskIndex = tmpList.findIndex(function(item) { return item.text === taskText; });

    if (taskIndex !== -1) {
      tmpList[taskIndex].check = isChecked;
      localStorage.setItem("allTasks", JSON.stringify(tmpList));
    }
  }
}

// Toggle inner task check
function toggleInnerTaskCheck(target) {
  const upperText = target.closest('.collapse').parentElement.children[0].innerText;
  const innerText = target.parentElement.children[0].innerText;
  const isChecked = target.parentElement.children[0].classList.toggle("line-throught");

  if (supportsLocalStorage) {
    const tmp = JSON.parse(localStorage.getItem("innerTasks")) || [];
    const taskIndex = tmp.findIndex(function(item) { 
      return item.mainText === innerText && item.upperTaskText === upperText; 
    });

    if (taskIndex !== -1) {
      tmp[taskIndex].check = isChecked;
      localStorage.setItem("innerTasks", JSON.stringify(tmp));
    }
  }
}

// Add new inner task
function addNewInnerTask(target) {
  const inputElement = target.classList.contains("btn-add-inner-task") 
    ? target.parentElement.childNodes[1] 
    : target.parentElement.parentElement.childNodes[1];

  const text = inputElement.value.trim();
  if (text === "") return;

  const upperText = target.closest('.collapse').parentElement.children[0].innerText;

  if (supportsLocalStorage) {
    innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    const taskExists = innerTasks.some(function(item) { 
      return item.mainText === text && item.upperTaskText === upperText; 
    });

    if (taskExists) {
      alert("Task Already Added");
    } else {
      innerTasks.push({ upperTaskText: upperText, mainText: text, check: false });
      addInnerTask(upperText, text);
      saveInnerTasks(innerTasks[innerTasks.length - 1], 1);
    }
  } else {
    addInnerTask(upperText, text);
  }

  inputElement.value = "";
}

// Delete all tasks
function deleteAll(e) {
  e.preventDefault();
  const list = e.target.closest('.card-body').querySelector('ul');
  while (list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
  if (supportsLocalStorage) {
    saveLS("", -1);
    saveInnerTasks("", -1);
  }
}

// Load main tasks
function loadLS() {
  if (supportsLocalStorage) {
    allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    allTasks.forEach(function(item) {
      if (item.text !== "") {
        createNewTask(item.text, item.check);
      }
    });
  }
}

// Load inner tasks
function loadInnerTasks() {
  if (supportsLocalStorage) {
    innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    innerTasks.forEach(function(item) {
      if (item.mainText !== "") {
        addInnerTask(item.upperTaskText, item.mainText, item.check);
      }
    });
  }
}

// Save main tasks
function saveLS(text, index) {
  if (!supportsLocalStorage) return;

  if (index === -1) {
    localStorage.removeItem("allTasks");
    allTasks = [];
    loadLS();
  } else if (index === 0) {
    allTasks = allTasks.filter(function(item) { return item.text !== text; });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    const innerTasks = JSON.parse(localStorage.getItem("innerTasks")) || [];
    innerTasks.forEach(function(item) {
      if (item.upperTaskText === text) {
        saveInnerTasks(item, 0);
      }
    });
  } else if (index === 1) {
    allTasks.push({ text: text, check: false });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }
}

// Save inner tasks
function saveInnerTasks(item, index, upperText) {
  if (!supportsLocalStorage) return;

  if (index === -1) {
    localStorage.removeItem("innerTasks");
    innerTasks = [];
    loadInnerTasks();
  } else if (index === 0) {
    innerTasks = innerTasks.filter(function(e) { 
      return !(e.mainText === item && e.upperTaskText === upperText); 
    });
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
  } else if (index === 1) {
    innerTasks.push(item);
    localStorage.setItem("innerTasks", JSON.stringify(innerTasks));
  }
}