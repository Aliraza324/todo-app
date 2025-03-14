const addToList = () => {
  let todo = document.getElementById("todo").value;
  if (todo === "") {
      displayError("Please enter a valid value");
      return;
  } 

  // Create List Item
  const todoItem = document.createElement("li");

  // Create Text Span
  const textSpan = document.createElement("span");
  textSpan.textContent = todo;

  // Create Menu Container (menuItem)
  let menuItem = document.createElement("div");
  menuItem.classList.add("menuItem");

  // Edit Button
  const editBtn = document.createElement("i");
  editBtn.classList.add("fa-solid", "fa-pen-to-square");
  editBtn.onclick = function () {
      let newValue = prompt("Enter a new value:", textSpan.textContent);
      if (newValue !== null && newValue.trim() !== "") {
          textSpan.textContent = newValue;
          updateLocalStorage();
      }
  };

  // Complete Button
  const completeBtn = document.createElement("i");
  completeBtn.classList.add("fa-solid", "fa-thumbs-up");
  completeBtn.onclick = function () {
      textSpan.style.textDecoration = "line-through";
      updateLocalStorage();
  };

  // Delete Button
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fa-solid", "fa-trash-can");
  deleteBtn.onclick = function () {
      if (confirm("Are you sure to delete this task?")) {
          todoItem.remove();
          updateLocalStorage();
      }
  };

  // Append Buttons to menuItem
  menuItem.appendChild(editBtn);
  menuItem.appendChild(completeBtn);
  menuItem.appendChild(deleteBtn);

  // Append Elements to todoItem
  todoItem.appendChild(textSpan);
  todoItem.appendChild(menuItem);

  // Append todoItem to List
  document.getElementById("list").appendChild(todoItem);

  // Save to Local Storage
  updateLocalStorage();

  // Clear Error & Input
  document.getElementById("error").textContent = "";
  document.getElementById("todo").value = "";
};

// Display Error Function
const displayError = (message) => {
  document.getElementById("error").textContent = message;
  document.getElementById("error").style.color = "rgb(239 68 68 / 85%)";
};

// Function to update localStorage
const updateLocalStorage = () => {
  let todos = [];
  document.querySelectorAll("#list li").forEach((item) => {
      todos.push({
          text: item.querySelector("span").textContent,
          completed: item.querySelector("span").style.textDecoration === "line-through"
      });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to load todos from localStorage
const loadTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => {
      let todoItem = document.createElement("li");

      let textSpan = document.createElement("span");
      textSpan.textContent = todo.text;
      if (todo.completed) textSpan.style.textDecoration = "line-through";

      let menuItem = document.createElement("div");
      menuItem.classList.add("menuItem");

      const editBtn = document.createElement("i");
      editBtn.classList.add("fa-solid", "fa-pen-to-square");
      editBtn.onclick = function () {
          let newValue = prompt("Enter a new value:", textSpan.textContent);
          if (newValue !== null && newValue.trim() !== "") {
              textSpan.textContent = newValue;
              updateLocalStorage();
          }
      };

      const completeBtn = document.createElement("i");
      completeBtn.classList.add("fa-solid", "fa-thumbs-up");
      completeBtn.onclick = function () {
          textSpan.style.textDecoration = "line-through";
          updateLocalStorage();
      };

      const deleteBtn = document.createElement("i");
      deleteBtn.classList.add("fa-solid", "fa-trash-can");
      deleteBtn.onclick = function () {
          if (confirm("Are you sure to delete this task?")) {
              todoItem.remove();
              updateLocalStorage();
          }
      };

      menuItem.appendChild(editBtn);
      menuItem.appendChild(completeBtn);
      menuItem.appendChild(deleteBtn);

      todoItem.appendChild(textSpan);
      todoItem.appendChild(menuItem);

      document.getElementById("list").appendChild(todoItem);
  });
};

// Load todos when page loads
window.onload = loadTodos;
