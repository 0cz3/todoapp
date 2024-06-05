import { element, render } from "./refactorUtil.js";

let idx = 0;
let todoItems = [];

export class Todo {
  /**
   * @return {Object} インスタンス自身
   */
  constructor(obj) {
    this.idx = idx++;
    this.title = obj.title;
    this.completed = false;
    this.todoItemCountElement = document.querySelector(obj.todoItemCountElement);
    this.containerElement = document.querySelector(obj.containerElement);
    this.todoListElement = element `<ul></ul>`;
    this.todoItems = [...todoItems, obj];
    console.log(this.todoItems);
  }

  /**
   * カウンターの値を更新
   */
  updateCount() {
    this.todoItemCountElement.innerHTML = `Todoアイテム数: ${this.todoItems.length}`;
  }
  /**
   * todoを更新
   */
  updateTodo() {
    this.todoListElement.innerHTML = "";
    this.todoItems.forEach((todoItem) => {
      const todoItemElement = todoItem.completed
        ? element `<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s> <button class="delete">x</button></li>`
        : element `<li><input type="checkbox" class="checkbox">${todoItem.title}<button class="delete">x</button></li>`;
      this.todoListElement.appendChild(todoItemElement);
    })
    render(this.todoListElement, this.containerElement);
  }
  /**
   * todoを追加、DOMを変化させてtodo表示
   */
  addTodo() {
    this.updateCount();
    this.updateTodo();
  }
  toggleCompletedTodo(id) {
    todoItems.forEach(todoItem => {
      const tarItem = todoItem.idx === id;
      if(!tarItem) {
        return
      }
      todoItem.completed = !todoItem.completed;
      this.updateTodo();
    });
  }
}
