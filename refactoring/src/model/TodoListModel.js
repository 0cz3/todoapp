import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @pram {todoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
     */
    constructor(items = []){
        super();
        this.#items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
    */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems() {
        return this.#items;
    }

    /**
     * TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener) {
        this.addEventListener("change",listener);
    }

    /**
     * 状態が変更された時に呼ぶ。登録済みのリスナー関数を呼び出す
     */
    emitChanges(){
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoItem) {
        this.#items.push(todoItem);
        this.emitChanges();
    }

    /**
     * 指定したidのTodoItemのcomputedを更新する
     * ＠param {{ id: number, computed: boolean }}
     */
    updateTodo({ id, completed}) {
        // `id`が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
        const todoItem = this.#items.find(todo => todo.id === id);
        if(!todoItem) {
            // return;
        }
        todoItem.completed = completed;
        this.emitChanges();
    }

    /**
     * 指定したidのTodoItemを削除する
     * ＠param {{ id: number }}
     */
    deleteTodo({ id }) {
        // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除
        this.#items = this.#items.filter(todo => {
            return todo.id !== id;
        })
        this.emitChanges();
    }
}