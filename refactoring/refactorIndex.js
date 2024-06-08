import { Todo } from './src/refactorTodo.js';
import { element, render } from "./src/refactorUtil.js";

const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");
const deleteButton = document.querySelector("#js-delete");
const containerElement = document.querySelector("#js-todo-list");

formElement.addEventListener("submit" , (event) => {
    event.preventDefault();
    const newTodo = new Todo({
        "title": inputElement.value,
        "completed" : false,
        "todoItemCountElement": '#js-todo-count',
        "containerElement": '#js-todo-list',
        });
    newTodo.addTodo();
    inputElement.value = "";

    const todoItems = newTodo.getItems();
    todoItems.forEach((todoItem) => {
        const checkbox = todoItem.todoItemElement.querySelector(".checkbox");
        checkbox.addEventListener("change", (e) =>{
            const id = todoItem.idx;
            newTodo.toggleCompletedTodo(id);
            e.stopImmediatePropagation();
        })
    });
});

