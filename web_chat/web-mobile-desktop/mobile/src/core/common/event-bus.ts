import { Subject } from 'rxjs';
import { KindOfMsg } from 'core/common/types/message';
import { PushStreamTypes } from './types/push-stream-types';

export interface EventBusType {
  type: EventBusName | KindOfMsg;
  payload?: any;
}

export enum EventBusName  {
  NEW_MESSENGER = 'NEW_MESSENGER',
  CREATE_CHAT_ROOM = 'CREATE_CHAT_ROOM',

  INCOMING_MESSAGE = 'INCOMING_MESSAGE',
  UPDATE_STATUS_USER = 'UPDATE_STATUS_USER',
  NEW_USER_CHAT = 'NEW_USER_CHAT',
  RELOAD_LIST_CHAT = 'RELOAD_LIST_CHAT',
  TYPE_DELETED_MESSENGER = 'TYPE_DELETED_MESSENGER',
  //Action message
  CHAT_DETAIL_ACTION_ANSWER = 'CHAT_DETAIL_ACTION_ANSWER',
  CHAT_DETAIL_ACTION_EDIT = 'CHAT_DETAIL_ACTION_EDIT',
  CHAT_DETAIL_ACTION_COPY = 'CHAT_DETAIL_ACTION_COPY',
  CHAT_DETAIL_ACTION_REMOVE = 'CHAT_DETAIL_ACTION_REMOVE'
}

export default class EventBus {
  private static instance: EventBus;
  private eventSubject = new Subject<EventBusType>();

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  get events() {
    return this.eventSubject.asObservable();
  }

  post(event: EventBusType) {
    this.eventSubject.next(event);
  }
}
