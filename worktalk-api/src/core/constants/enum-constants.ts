export const ENUM_CONSTANTS = {
    ATTACHMENT_STATUS: {
        IN_ACTIVE: "0",
        ACTIVE: "1"
    },
    ATTACHMENT_TYPE: {
        OTHER: "0",
        IMAGE: "1",
        VIDEO: "2",
        TEXT_FILE: "3",
    },
    MESSAGE_TYPE: {
        TEXT: "0",
        ATTACHMENT: "1",
        LINK: "2",
        EVENT: "3",
        REPLY: "4",
        ONLY_CALL: "5",
        VIDEO_CALL: "6",
        SYSTEM: "7"
    },
    CHAT_STATUS: {
        IN_ACTIVE: "0",
        ACTIVE: "1",
    },
    MESSAGE_STATUS: {
        SENT: "0",
        RECEIVED: "1",
        SEEN: "2",
    },
    CHATROOM_STATUS: {
        IN_ACTIVE: "0",
        ACTIVE: "1",
    },
    CHATROOM_TYPE: {
        PERSONAL: "0",
        GROUP: "1",
    },
    CHATROOM_MEMBER_STATUS: {
        IN_ACTIVE: "0",
        ACTIVE: "1",
    },
    DEVICE_STATUS: {
        IN_ACTIVE: "0",
        ACTIVE: "1",
    },
    ONLINE:{
        ONLINE: "1",
        OFFLINE: "0"
    }
}

export const ENUM_CONSTANTS_PUSH_STREAM = {
    NEW_MESSENGER: "NEW_MESSENGER",
    VIDEO_CALL: "VIDEO_CALL",
    NOTIFICATION: "NOTIFICATION",
    UPDATE_AVATAR_TITLE: "UPDATE_AVATAR_TITLE",
    UPDATE_MESSENGER: "UPDATE_MESSENGER", 
    IHCM_CLICK_NOTIFICAION: "IHCM_CLICK_NOTIFICAION",
    IHCM_PUSH_ROOM_ID_TO_BOX_CHAT: "IHCM_PUSH_ROOM_ID_TO_BOX_CHAT",
    UPDATE_ONLINE_OFFLINE: "UPDATE_ONLINE_OFFLINE",
    FIRST_MESSAGE: "",
    CREATE_CHAT_ROOM: "CREATE_CHAT_ROOM",
}


export const ENUM_TYPE_STATUS_VIDEO_CALL = {
    NOT_LISTEN_CALL_VIDEO: "0",//không nhận cuộc gọi video
    LISTEN_CALL_VIDEO: "1",//Nhận cuộc gọi video
    MISSED_CALL_VIDEO: "2",// Nhỡ cuộc gọi video
    CALL_AWAY_CALL_VIDEO: "3",// Cuộc gọi đi
    INCOMING_CALL_VIDEO: "4",// Cuộc gọi đến
}

export const ENUM_KIND_OF_TYPE_VIDEO_CALL = {
    PRIVATE: "PRIVATE",
    GROUP: "GROUP",
    TYPE_VIDEO_CALL: "TYPE_VIDEO_CALL",
}

export const ENUM_KIND_OF_FIELD_NAME = {
    USER_ID_CALL: "USER_ID_CALL"
}

export const ENUM_KIND_OF_TYPE_NOTIFICATION = {
    TAG: 1,//đã nhắc bạn trong một bình luận
    KICKED: 2,//đã trả lời bình luận của bạn
    LIKE: 3,//đã tương tác bình luận của bạn 
    REPLY: 4,//đã trả lời bình luận của bạn trong
    DELETE_ROOM: 5,//đã xóa nhóm chat
    CANCEL_PERMISSION_ADMIN: 6,//hủy quyền admin
    ADD_PERMISSION: 7,//chỉ dịch quyền admin
    USER_OUT_ROOM_CHAT: 8,//Người dùng tự thoát khỏi nhóm
}

export const ENUM_KIND_OF_MESSAGE_TYPE = {
    TEXT : "0",
    ATTACHMENT : "1",
    LINK : "2",
    EVENT : "3",
    ONLY_CALL : "5",
    VIDEO_CALL : "6",
    SYSTEM: "7"
}
