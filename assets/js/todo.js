const logoutBtn = document.getElementById("logoutBtn");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const newTask = document.getElementById("newTask");

const currentUser = localStorage.getItem("currentUser");
if (!currentUser) window.location.href = "auth.html";

let users = JSON.parse(localStorage.getItem("users")) || {};
let todos = users[currentUser]?.todos || [];

function saveTodos() {
  users[currentUser].todos = todos;
  localStorage.setItem("users", JSON.stringify(users));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${todo.done ? "checked" : ""} data-index="${i}" />
      <span contenteditable>${todo.text}</span>
      <button data-index="${i}" class="delete">✖</button>
    `;
    li.querySelector("input").onchange = (e) => {
      todos[i].done = e.target.checked;
      saveTodos();
    };
    li.querySelector(".delete").onclick = () => {
      todos.splice(i, 1);
      saveTodos();
      renderTodos();
    };
    li.querySelector("span").onblur = (e) => {
      todos[i].text = e.target.textContent.trim();
      saveTodos();
    };
    todoList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = newTask.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  newTask.value = "";
  saveTodos();
  renderTodos();
};

logoutBtn.onclick = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
};

renderTodos();
