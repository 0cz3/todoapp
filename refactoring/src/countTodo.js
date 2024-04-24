const todoItemCountElement = document.querySelector("#js-todo-count");
let todoItemCount = 0;

const countTodo = () => {
    todoItemCount += 1;
    todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
}

export default countTodo;