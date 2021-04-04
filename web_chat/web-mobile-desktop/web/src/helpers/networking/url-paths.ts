export const URL_PATHS = {
  LIST_ROOM_CHAT: "api/chat-rooms",//

  GET_COMPANYMEMBERLIST: "api/user",
  GET_COMPANYMEMBERLIST_BYQUERY: "/api/user/search-user",
  GET_COMPANYMEMBERLIST_SEARCH: "api/user/search-user-chat",
  GET_CHATROOMDETAIL: "api/chat-rooms/findById",
  GET_CHATLIST: "api/chat/get-messages",
  POST_CHATROOM: "api/chat-rooms",
  POST_MESSAGE: "api/chat/send-message",
  POST_FIRST_MESSAGE: "api/chat/send-first-message",
  PUT_REMOVE_MESSAGE: "api/chat/remove-message",
  PUT_UPDATE_MESSAGE: "api/chat/update-message",
  POST_USER: "api/user",

  POST_FILE: "api/attachment",

  //hungdm - api get list member in chat room
  GET_MEMBER_IN_CONVERSION: "api/chat-room-member/list-member",
  GET_MEMBER_WITH_USER_LOGIN_IN_CONVERSION: "api/chat-room-member/list-member-with-user-login",
  GET_LIST_LINK_IN_ROOMCHAT: "api/chat/list-link",
  GET_LIST_ATTACHMENT_IN_ROOMCHAT: "api/attachment/list-attachment",
  GET_CHATROOM_DETAIL: "api/chat-rooms/detail",
  POST_GET_USER_BY_ID: "api/user/get-user-by-id",
  GET_USER_OTHER_IN_CHAT2: "api/chat-room-member/user-infor",
  POST_PUSH_STREAM_VIDEO_CALL: "api/videocall/push-stream-video-call",
  POST_CREATE_MESSGAE_STATUS_VIDEO_CALL: "api/videocall/status-video-call",
  POST_DELETE_USER_IN_CHAT_ROOM: "api/chat-room-member/delete-user-in-chat-room",
  POST_UPDATE_PERMISSION_CHAT_ROOM: "api/chat-room-member/update-permission-admin-room-chat",
  POST_GET_LIST_CHATROOM_BY_USER: "api/chat-rooms/list-chat-by-user",
  GET_USER_OTHER_IN_LIST_CONVERSATION_POPUP: "api/user/user-other-conversation",
  POST_NOTIFICATION_TAG_NAME: "api/chat/push-notification",

  //delete room chat
  DELETE_ROOM_CHAT: "api/chat-rooms",


  //quyennq
  GET_SEARCH_MESSAGE_BY_TEXT: 'api/chat/search-messages',
  GET_PAGE_BY_MESSAGE: 'api/chat/get-page-by-message',
  GET_SEARCH_CHAT_ROOM: 'api/chat-rooms/search',

  POST_UPDATE_AVATAR: 'api/chat-rooms/update-avatar-or-title-room-chat',

  //phuongvv
  GET_NOTIFICATION: 'api/notification/get-notification',
  CHANGE_STATUS_NOTIFICATION: 'api/notification/change-status-notification',
  CHANGE_STATUS_NOTIFICATION_BY_USER: 'api/notification/change-status-notification-by-user',
  CHANGE_STATUS_NOTIFICATION_BY_ID: 'api/notification/change-status-notification-by-id',

  //vinhtq : 08/03/2021
  POST_UPDATE_NOTIFICATION_CHAT_ROOM_MEMBER: 'api/chat-room-member/update-notification',
  GET_CHAT_ROOM_MEMBER_BY_USERID_AND_ROOMCHATID: 'api/chat-room-member/get-chat-room-member-by-userid-and-roomchatid',

  //tuda: last updated 21/03/2021
  GET_SINGLE_ROOM: 'api/chat-rooms/getSingleRoom',
  POST_IHCM_SEND_ROOMID_TO_BOX_CHAT: 'api/ihcm-chat/send-room-id-to-box-chat',
  UPDATE_ONLINE_OFFLINE: 'api/user/update-online',
  ADD_MEMBER: 'api/chat-room-member',

  //vinhtq : 10/03/2021
  POST_IHCM_CHAT_SEND_NOTIFICATION: 'api/ihcm-chat/send-notification',

  //huy
  POST_CREATE_ROOM: "api/chat-rooms",

  //vinhtq : 12/03/2021
  POST_USER_OUT_ROOM_CHAT: 'api/chat-room-member/user-out-room-chat',
  // quyennq them api count notification
  COUNT_NOTIFICATION: 'api/notification/count-notification'
}


