import { Todo } from "./src/refactorTodo.js";

const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTodo = new Todo({
    title: inputElement.value,
    completed: false,
    todoItemCountElement: "#js-todo-count",
    containerElement: "#js-todo-list",
  });
  newTodo.addTodo();
  inputElement.value = "";
});
