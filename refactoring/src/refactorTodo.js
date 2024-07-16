import { element, render } from "./refactorUtil.js";

let idx = 0;
let items = [];

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
    this.todoListElement = element`<ul></ul>`;
  }
  /**
   * カウンターの値を更新
   */
  updateCount() {
    this.todoItemCountElement.innerHTML = `Todoアイテム数: ${items.length}`;
  }
  /**
   * todoを更新
   */
  updateTodo() {
    this.todoListElement.innerHTML = "";
    items.forEach((item) => {
      item.todoItemElement = item.completed
        ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s> <button class="delete">x</button></li>`
        : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;

      this.todoListElement.appendChild(item.todoItemElement);

      const checkbox = item.todoItemElement.querySelector(".checkbox");
      checkbox.addEventListener("change", (e) => {
        this.toggleCompletedTodo(item.idx);
        e.stopImmediatePropagation();
      });

      const deleteButton = item.todoItemElement.querySelector(".delete");
      deleteButton.addEventListener("click", (e) => {
        this.deleteTodo(item.idx);
        e.stopImmediatePropagation();
      });
    });
    render(this.todoListElement, this.containerElement);
    this.updateCount();
  }
  /**
   * todoを追加、DOMを変化させてtodo表示
   */
  addTodo() {
    this.items = items.push(this);
    this.updateTodo();
  }
  /**
   * todoの完了状態を更新
   */
  toggleCompletedTodo(id) {
    items.forEach((todoItem) => {
      const tarItem = todoItem.idx === id;
      if (!tarItem) {
        return;
      }
      todoItem.completed = !todoItem.completed;
      this.updateTodo();
    });
  }
  /**
   * todoを削除
   */
  deleteTodo(id) {
    items = items.filter((todoItem) => {
      return todoItem.idx !== id;
    })
    this.updateTodo();
  }
}
