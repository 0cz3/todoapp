import addTodo from "./src/addTodo.js";
import countTodo from "./src/countTodo.js";

const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");
const checkbox = document.querySelector("#js-checkbox");
const deleteButton = document.querySelector("#js-delete");

let todoItems = []
let idx = 0;

formElement.addEventListener("submit" , (event) => {
    event.preventDefault();
    //itemを定義、todo[]へpush
    const item = {
        "id": idx ++,
        "title": inputElement.value,
        "completed" : false,
    };
    todoItems.push(item);
    const todoItem = todoItems.reduce((accumulator, currentValue) => currentValue);
    addTodo(todoItem);
    countTodo();
})

if (checkbox !== null) {
    checkbox.addEventListener("change" , ()=>{
    //completedをtoggle
    //checkboxがcheck状態の時"completed" : true,そうでないときfalse
})}

if (deleteButton !== null) {
    deleteButton.addEventListener("click" , ()=>{
    //todo削除
    //countを-１
})}