import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render} from "./view/html-util.js";
export class App {
    // 1. TodoListModelの初期化
    #todoListModel = new TodoListModel();

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.#todoListModel.onChange(() => {
            // TodoリストをまとめるList要素
            const todoListElement = element `<ul></ul>`;
            // それぞれのTodoItem要素をtodoListElement以下へ追加する
            const todoItems = this.#todoListModel.getTodoItems();
            todoItems.forEach(item => {
                // 追加するTodoアイテムの要素(li要素)を作成する
                const todoItemElement = element`<li>${item.title}</li>`;
                // TodoアイテムをtodoListElementに追加する
                todoListElement.appendChild(todoItemElement);
            });
            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });
        formElement.addEventListener("submit",(event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
             // 入力欄を空文字列にしてリセットする
            inputElement.value = "";
        });
    }
}