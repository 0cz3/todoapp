import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render} from "./refactorUtil.js";
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
                // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
                // input要素にはcheckboxクラスをつける
                const todoItemElement = item.completed
                    ? element `<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s> <button class="delete">x</button></li>`
                    : element `<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
                // チェックボックスがトグルした時のイベントにリスナー関数を登録
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodItemの完了状態を反転させる
                    this.#todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                const deleteButtonElement = todoItemElement.querySelector(".delete");
                deleteButtonElement.addEventListener('click', () => {
                    this.#todoListModel.deleteTodo({
                        id: item.id
                    });
                })
                // TodoアイテムをtodoListElementに追加する
                todoListElement.appendChild(todoItemElement);
            });
            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });
        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit",(event) => {
            // 本来のsubmitイベントの動作を止める
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.#todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value,
                completed: false
            }));
             // 入力欄を空文字列にしてリセットする
            inputElement.value = "";
        });
    }
}