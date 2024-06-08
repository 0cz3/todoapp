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
    this.todoListElement = element `<ul></ul>`;
    this.todoItemElement = element `<li><input type="checkbox" class="checkbox">${obj.title}<button class="delete">x</button></li>`;
    this.items = items.push(this);
  }
  /**
   * itemsを返却
   */
  getItems() {
    return items;
  }
  /**
   * カウンターの値を更新
   */
  updateCount() {
    this.todoItemCountElement.innerHTML = `Todoアイテム数: ${this.items.length}`;
  }
  /**
   * todoを更新
   */
  updateTodo() {
    this.todoListElement.innerHTML = "";
    items.forEach((item) => {
    item.todoItemElement = item.completed
        ? element `<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s> <button class="delete">x</button></li>`
        : element `<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
        this.todoListElement.appendChild(item.todoItemElement);
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
  /**
   * todoの完了状態を更新
   */
  toggleCompletedTodo(id) {
    console.log();
    items.forEach(todoItem => {
      const tarItem = todoItem.idx === id;
      if(!tarItem) {
        return;
      }
      todoItem.completed = !todoItem.completed;
      this.updateTodo();
    });
  }
}
