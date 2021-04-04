import { KindOfMsg } from './types/message';
export interface EventBusType {
    type: EventBusName | KindOfMsg;
    payload?: any;
}
export declare enum EventBusName {
    INCOMING_MESSAGE = "INCOMING_MESSAGE",
    UPDATE_STATUS_USER = "UPDATE_STATUS_USER",
    NEW_USER_CHAT = "NEW_USER_CHAT",
    RELOAD_LIST_CHAT = "RELOAD_LIST_CHAT",
    TYPE_DELETED_MESSENGER = "TYPE_DELETED_MESSENGER",
    CHAT_DETAIL_ACTION_ANSWER = "CHAT_DETAIL_ACTION_ANSWER",
    CHAT_DETAIL_ACTION_EDIT = "CHAT_DETAIL_ACTION_EDIT",
    CHAT_DETAIL_ACTION_COPY = "CHAT_DETAIL_ACTION_COPY",
    CHAT_DETAIL_ACTION_REMOVE = "CHAT_DETAIL_ACTION_REMOVE"
}
export default class EventBus {
    private static instance;
    private eventSubject;
    static getInstance(): EventBus;
    get events(): import("rxjs").Observable<EventBusType>;
    post(event: EventBusType): void;
}
