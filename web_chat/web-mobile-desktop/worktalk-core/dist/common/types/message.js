"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypes = exports.KindOfMsg = void 0;
var KindOfMsg;
(function (KindOfMsg) {
    KindOfMsg["TYPE_TEXT"] = "TEXT";
    KindOfMsg["TYPE_IMAGE"] = "IMAGE";
    KindOfMsg["TYPE_LINK"] = "LINK";
    KindOfMsg["TYPE_FILE"] = "FILE";
    KindOfMsg["TYPE_UNDEFINED"] = "UNDEFINED";
    KindOfMsg["STATUS_ORIGINAL"] = "ORIGINAL";
    KindOfMsg["STATUS_EDITED"] = "EDITED";
    KindOfMsg["STATUS_DELETED"] = "DELETED";
    KindOfMsg["STATUS_DISABLED"] = "DISABLED";
    KindOfMsg["TYPE_ROLE_PRIMARY"] = "PRIMARY";
    KindOfMsg["TYPE_ROLE_ATTACHED"] = "ATTACHED";
    KindOfMsg["TYPE_ROLE_NOTIFIED"] = "NOTIFIED";
    KindOfMsg["TYPE_VIDEO_CALL_INCOMING"] = "TYPE_VIDEO_CALL_INCOMING";
    KindOfMsg["TYPE_VIDEO_CALL_OUTGOING"] = "TYPE_VIDEO_CALL_OUTGOING";
    KindOfMsg["TYPE_VIDEO_CALL_ACCEPT"] = "TYPE_VIDEO_CALL_ACCEPT";
    KindOfMsg["TYPE_VIDEO_CALL_FINISH"] = "TYPE_VIDEO_CALL_FINISH";
    KindOfMsg["TYPE_VIDEO_CALL_DENY"] = "TYPE_VIDEO_CALL_DENY";
})(KindOfMsg = exports.KindOfMsg || (exports.KindOfMsg = {}));
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["CHAT_GROUP"] = "CHAT_GROUP";
    MessageTypes["CHAT_USER"] = "CHAT_USER";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
