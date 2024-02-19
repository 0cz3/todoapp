export class EventEmitter {
    // 登録する[イベント名, Set(リスナー関数)]を管理するMap
    #listeners = new Map();
    /**
     * 指定したイベントが実行された時に呼び出されるリスナー関数を登録する
     * @param {string} type イベント名
     * @param {function} listener イベントリスナー
     */
    addEventListener(type, listener){
        // 指定したイベントに対応するSetを作成しリスナー関数を登録する
        if(!this.#listeners.has(type)){
            this.#listeners.set(type, new Set());
        }
        const listenerSet = this.#listeners.get(type);
        listenerSet.add(listener);
    }
}