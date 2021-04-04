export const ENUM_KIND_OF_VIDEO_CALL = {
    LINK_JITSI_MEET:"meet.hyperlogy.com",
    LINK_JITSI_MEET_JS:"https://meet.jit.si/external_api.js",
}

export const ENUM_KIND_OF_MESSAGE_VIDEO_CALL = {
    NOT_LISTEN_CALL_VIDEO : "Cuộc gọi bị từ chối",
    LISTEN_CALL_VIDEO  : "Cuộc gọi",
    MISSED_CALL_VIDEO  : "Cuộc gọi nhỡ",
    CALL_AWAY_CALL_VIDEO :"Cuộc gọi đi",
    INCOMING_CALL_VIDEO :"Cuộc gọi đến",
    CREATE_CALL_VIDEO :"Tạo cuộc gọi",
    RETURN_CALL_VIDEO :"Cuộc gọi kết thúc",
}

export const ENUM_TYPE_STATUS_VIDEO_CALL = {
    NOT_LISTEN_CALL_VIDEO : "0",//không nhận cuộc gọi video
    LISTEN_CALL_VIDEO  : "1",//Nhận cuộc gọi video
    MISSED_CALL_VIDEO  : "2",// Nhỡ cuộc gọi video
    CALL_AWAY_CALL_VIDEO :"3",// Cuộc gọi đi
    INCOMING_CALL_VIDEO :"4",// Cuộc gọi đến
    CLOSE_CALL_VIDEO :"5",// Cuộc gọi đến
}