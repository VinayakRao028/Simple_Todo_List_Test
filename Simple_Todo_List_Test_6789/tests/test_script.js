// Mock DOM elements
const mockDocument = {
  getElementById: (id) => ({
    addEventListener: jest.fn(),
    appendChild: jest.fn(),
    children: [],
    classList: {
      remove: jest.fn(),
      toggle: jest.fn(),
    },
    setAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    cloneNode: () => mockDocument.getElementById(id),
  }),
};

global.document = mockDocument;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

// Mock alert function
global.alert = jest.fn();

// Implementation code
let allTasks = [];
let innerTasks = [];
let count = 1;

const upperLi = document.getElementById("upperLi");
const innerLi = document.getElementById("innerLi");
const mainForm = document.getElementById("addingForm");
const mainInput = { value: "" };
mainForm.children = [mainInput];
const mainList = document.getElementById("mainList");
mainList.children = [{ children: [] }];
const delAll = document.getElementById("delAll");

function initializeApp() {
  eventListeners();
  loadLS();
  loadInnerTasks();
}

function eventListeners() {
  mainForm.addEventListener("submit", addNewItem);
  mainList.addEventListener("click", taskStufs);
  delAll.addEventListener("click", deleteAll);
}

function createNewTask(text, check = false) {
  const newLi = upperLi.cloneNode(true);
  newLi.classList.remove("d-none");
  newLi.removeAttribute("id");

  const link = { setAttribute: jest.fn(), classList: { toggle: jest.fn() }, innerText: "" };
  newLi.children = [link, {}, {}, { setAttribute: jest.fn() }];

  link.setAttribute("href", `#collapse${count}`);
  link.classList.toggle("line-throught", check);
  link.innerText = text;

  newLi.children[3].setAttribute("id", `collapse${count}`);

  mainList.children[0].appendChild(newLi);

  count++;
  mainInput.value = "";
}

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
      break;
    case 1:
      tmp.push({ text, check: false });
      localStorage.setItem("allTasks", JSON.stringify(tmp));
      break;
  }
}

function loadLS() {
  allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  allTasks.forEach(item => {
    if (item.text !== "") {
      createNewTask(item.text, item.check);
    }
  });
}

function taskStufs(e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains("delete-item")) {
    handleDeleteItem(target);
  } else if (target.classList.contains("check")) {
    handleCheckItem(target);
  }
}

function handleDeleteItem(target) {
  const text = target.parentElement.children[0].innerText;
  saveLS(text, 0);
  target.parentElement.remove();
}

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

function deleteAll(e) {
  e.preventDefault();
  const list = { children: [1, 2, 3] };
  
  while (list.children.length > 1) {
    list.children.pop();
  }

  saveLS("", -1);
}

// Test suite
describe('Task Management Application', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.getItem.mockReturnValue(null);
    count = 1;
  });

  test('initializeApp sets up event listeners and loads data', () => {
    initializeApp();
    expect(mainForm.addEventListener).toHaveBeenCalledWith("submit", addNewItem);
    expect(mainList.addEventListener).toHaveBeenCalledWith("click", taskStufs);
    expect(delAll.addEventListener).toHaveBeenCalledWith("click", deleteAll);
    expect(localStorage.getItem).toHaveBeenCalledWith("allTasks");
    expect(localStorage.getItem).toHaveBeenCalledWith("innerTasks");
  });

  test('createNewTask creates a new task element', () => {
    createNewTask("Test Task");
    expect(upperLi.cloneNode).toHaveBeenCalled();
    expect(mainList.children[0].appendChild).toHaveBeenCalled();
    expect(count).toBe(2);
    expect(mainInput.value).toBe("");
  });

  test('addNewItem adds a new task if it does not exist', () => {
    mainInput.value = "New Task";
    localStorage.getItem.mockReturnValue(JSON.stringify([]));
    addNewItem({ preventDefault: jest.fn() });
    expect(localStorage.setItem).toHaveBeenCalledWith("allTasks", JSON.stringify([{ text: "New Task", check: false }]));
  });

  test('addNewItem shows alert if task already exists', () => {
    mainInput.value = "Existing Task";
    localStorage.getItem.mockReturnValue(JSON.stringify([{ text: "Existing Task", check: false }]));
    addNewItem({ preventDefault: jest.fn() });
    expect(alert).toHaveBeenCalledWith("Task Already Added");
  });

  test('saveLS saves tasks to localStorage', () => {
    saveLS("New Task", 1);
    expect(localStorage.setItem).toHaveBeenCalledWith("allTasks", JSON.stringify([{ text: "New Task", check: false }]));
  });

  test('loadLS loads tasks from localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([{ text: "Task 1", check: false }, { text: "Task 2", check: true }]));
    loadLS();
    expect(count).toBe(3);
  });

  test('handleDeleteItem removes a task', () => {
    const mockTarget = {
      parentElement: {
        children: [{ innerText: "Task to Delete" }],
        remove: jest.fn()
      }
    };
    handleDeleteItem(mockTarget);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(mockTarget.parentElement.remove).toHaveBeenCalled();
  });

  test('handleCheckItem toggles task check state', () => {
    const mockTarget = {
      parentElement: {
        children: [{ innerText: "Task to Check", classList: { toggle: jest.fn(() => true) } }]
      }
    };
    localStorage.getItem.mockReturnValue(JSON.stringify([{ text: "Task to Check", check: false }]));
    handleCheckItem(mockTarget);
    expect(localStorage.setItem).toHaveBeenCalledWith("allTasks", JSON.stringify([{ text: "Task to Check", check: true }]));
  });

  test('deleteAll removes all tasks', () => {
    deleteAll({ preventDefault: jest.fn() });
    expect(localStorage.removeItem).toHaveBeenCalledWith("allTasks");
  });
});