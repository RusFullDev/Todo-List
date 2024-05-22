const elForm = document.querySelector(".js-form");
const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elAllCount = document.querySelector(".js-all-count");
const elCompCount = document.querySelector(".js-comp-count");
const elUnCompCount = document.querySelector(".js-uncomp-count");
const elBtnWrapper = document.querySelector(".btn-wrapper");
const elModeBtn = document.querySelector(".mode-btn");
let mode = localStorage.getItem("theme") == "dark" ? true : false;
let localTodos = JSON.parse(localStorage.getItem("todos"));

// const todos = localTodos.length ? localTodos : [];
const todos = localTodos || [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  todos.push({
    id: todos.length ? todos.at(-1).id + 1 : 1,
    text: elInput.value,
    isCompleted: false,
  });

  elInput.value = "";
  renderTodos(todos, elList);
  localStorage.setItem("todos", JSON.stringify(todos));
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".todo-delete-btn")) {
    let deletedTodoId = evt.target.dataset.todoId;

    let deletedTodoIndex = todos.findIndex((item) => item.id == deletedTodoId);

    todos.splice(deletedTodoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, elList);
  }

  if (evt.target.matches(".todo-edit-btn")) {
    let newText = prompt("Text kiriting");

    let editedTodoId = evt.target.dataset.todoId;

    let editedTodoItem = todos.find((item) => item.id == editedTodoId);

    editedTodoItem.text = newText;

    // renderTodos([...todos], elList);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, elList);
  }
  if (evt.target.matches(".todo-checkbox")) {
    let completedTodoId = evt.target.dataset.todoId;

    let completedTodoItem = todos.find((item) => item.id == completedTodoId);

    completedTodoItem.isCompleted = !completedTodoItem.isCompleted;
    // renderTodos([...todos], elList);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, elList);
  }
});

function renderTodos(array, node) {
  node.innerHTML = "";
  elAllCount.textContent = todos.length;
  elCompCount.textContent = todos.filter((item) => item.isCompleted).length;
  elUnCompCount.textContent = todos.filter((item) => !item.isCompleted).length;

  array.forEach((item) => {
    let newItem = document.createElement("li");
    let newText = document.createElement("span");
    let newInput = document.createElement("input");
    let newDeleteBtn = document.createElement("button");
    let newEditBtn = document.createElement("button");

    newText.textContent = item.text;
    newInput.type = "checkbox";
    newDeleteBtn.textContent = "DELETE";
    newEditBtn.textContent = "EDIT";

    newItem.setAttribute("class", "list-group-item d-flex align-items-center");
    newInput.setAttribute("class", "form-check-input me-2 todo-checkbox");
    newText.setAttribute("class", "flex-grow-1");
    newDeleteBtn.setAttribute("class", "btn btn-danger todo-delete-btn");
    newEditBtn.setAttribute("class", "btn btn-warning me-2 todo-edit-btn");

    newDeleteBtn.dataset.todoId = item.id;
    newEditBtn.dataset.todoId = item.id;
    newInput.dataset.todoId = item.id;

    if (item.isCompleted) {
      newInput.checked = true;
      newText.classList.add("text-decoration-line-through");
    }

    newItem.append(newInput, newText, newEditBtn, newDeleteBtn);
    node.appendChild(newItem);
  });
}

renderTodos(todos, elList);

elBtnWrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-all-btn")) {
    renderTodos(todos, elList);
  }
  if (evt.target.matches(".js-comp-btn")) {
    let newArray = todos.filter((item) => item.isCompleted);
    renderTodos(newArray, elList);
  }
  if (evt.target.matches(".js-uncomp-btn")) {
    let newArray = todos.filter((item) => !item.isCompleted);
    renderTodos(newArray, elList);
  }
});

elModeBtn.addEventListener("click", () => {
  console.log((mode = !mode));
  localStorage.setItem("theme", mode ? "dark" : "light");
  changeTheme();
});

function changeTheme() {
  if (localStorage.getItem("theme") == "dark") {
    window.document.body.classList.add("dark")
    window.document.body.classList.remove("light")
  } else {
    window.document.body.classList.add("light")
    window.document.body.classList.remove("dark")
  }
}

changeTheme();
