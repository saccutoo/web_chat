import { KindOfMsg } from "./message";
import { Subject } from "rxjs";

export interface EventBusType {
  type: EventBusName | KindOfMsg;
  payload?: any;
}

export enum EventBusName {
  INCOMING_MESSAGE = "INCOMING_MESSAGE",
  UPDATE_STATUS_USER = "UPDATE_STATUS_USER",
  NEW_USER_CHAT = "NEW_USER_CHAT",
  RELOAD_LIST_CHAT = "RELOAD_LIST_CHAT",
  TYPE_DELETED_MESSENGER = "TYPE_DELETED_MESSENGER",
  //Action message
  CHAT_DETAIL_ACTION_ANSWER = "CHAT_DETAIL_ACTION_ANSWER",
  CHAT_DETAIL_ACTION_EDIT = "CHAT_DETAIL_ACTION_EDIT",
  CHAT_DETAIL_ACTION_COPY = "CHAT_DETAIL_ACTION_COPY",
  CHAT_DETAIL_ACTION_REMOVE = "CHAT_DETAIL_ACTION_REMOVE",
  //
  NEW_MESSENGER = "NEW_MESSENGER",
  PUSH_GROUP_TO_TOP = "PUSH_GROUP_TO_TOP",

  //vinhtq:cập nhập avatar
  PUSH_UPDATE_AVATAR = "PUSH_UPDATE_AVATAR",
  // quyennq sửa type thông báo map với server
  PUSH_NOTIFICATION = "NOTIFICATION",
  PUSH_NOTIFICATION_ON_OFF = "PUSH_NOTIFICATION_ON_OFF",

  //tuda: xu ly event ihcm
  SHOW_IHCM_LIST_GROUP_IFRAME = "SHOW_IHCM_LIST_GROUP_IFRAME",
  IHCM_PUSH_ROOM_ID_TO_BOX_CHAT = "IHCM_PUSH_ROOM_ID_TO_BOX_CHAT",
  UPDATE_ONLINE_OFFLINE = "UPDATE_ONLINE_OFFLINE",
  CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM",
  // huy
  UPDATE_MESSENGER = "UPDATE_MESSENGER",
  //hungdm - GET INFOR CHAT DETAIL
  CHAT_DETAIL = "CHAT_DETAIL"

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
