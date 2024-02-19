export class EventEmitter {
    // 登録する[イベント名, Set(リスナー関数)]を管理するMap
    #listeners = new Map();
}