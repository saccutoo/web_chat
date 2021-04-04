export const URL_PATHS = {
  CHECK_TICKET:
    'https://sso.hyperlogy.com/cas/serviceValidate?pgtUrl=https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2Fj_spring_cas_proxyreceptor.hyper&ticket=my_ticket&service=https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2F',
  MOBILE_LOGIN: '/mobileLogin',
  //TODO
  BASE_URL_IHCM: 'https://@domain/ihcm/',
  CAS_TGT: 'https://sso.hyperlogy.com/cas/v1/tickets',
  TOKEN_IHCM: 'https://@domain/ihcm/api/auth/validateCasTicket/?ticket=@ticket',
  PROFILE_IHCM: 'https://@domain/ihcm/api/employee/detailProfile',
  UPDATE_DEVICE_INFO: '/api/devices',
  SYNC_USER_IHCM: '/api/user',
  UPDATE_DEVICE_ID: '/api/update-device',
  LIST_ROOM_CHAT: '/api/chat-rooms',
  // SEARCH_USER: '/api/all-user',
  INSERT_MESSAGE: '/api/chat/send-message',
  // PUT_REMOVE_MESSAGE:"api/chat/remove-message",
  // PUT_UPDATE_MESSAGE:"api/chat/update-message",
  // GET_MESSAGES: '/messengers/suggestByChat',
  GET_MESSAGES: '/api/chat/get-messages',

  //New web
  POST_FILE: 'api/attachment',

  //hungdm - api get list member in chat room

  //Danh sach thanh vien trong nhom chat
  GET_MEMBER_IN_CONVERSION: 'api/chat-room-member/list-member',
  //Danh sach link trong nhom chat
  GET_LIST_LINK_IN_ROOMCHAT: 'api/chat/list-link',
  //Danh sach attachment trong nhom chat
  GET_LIST_ATTACHMENT_IN_ROOMCHAT: 'api/attachment/list-attachment',
  //Tim kiem thanh vien
  POST_SEARCH_USER: 'api/user/search-user',
  // Chat Room Info
  GET_CHATROOM_DETAIL: 'api/chat-rooms/detail',

  //vinhtq-video
  POST_PUSH_STREAM_VIDEO_CALL: 'api/videocall/push-stream-video-call',
  POST_GET_USER_BY_ID: 'api/user/get-user-by-id',
  POST_CREATE_MESSGAE_STATUS_VIDEO_CALL: 'api/videocall/status-video-call',

  //old-mobile
  UPDATE_STATUS_USER: '/users/updateStatus',
  LIST_USER: '/users/suggests',
  // create group chat
  CREATE_GROUP: '/chats/addChat',
  // CREATE_GROUP: "api/chat-rooms",

  REQUEST_TO_USER: '/chats/requestToUser',
  CREATE_ROM_CHAT: '/chats/createRoom',
  
  // upload file
  UPLOAD_FILE: '/uploadMultiple',
  // UPLOAD_FILE: "api/attachment",

  UPDATE_STATUS_VIDEO_CALL: '/messengers/updateStatusVideoCall',
  MESSAGE: '/messengers',
  CHAT_INFO: '/chats/infoChat',
  REMOVE_GROUP: '/users/removeUser',
  ADD_MEMBERS: '/chats/addMembers',
};
