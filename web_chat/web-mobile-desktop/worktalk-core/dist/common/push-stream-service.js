"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushStreamService = void 0;
// import { store } from '../redux/store/store';
// import { showMessage } from 'react-native-flash-message';
var reconnecting_websocket_1 = require("reconnecting-websocket");
var event_bus_1 = require("./event-bus");
var push_stream_types_1 = require("./types/push-stream-types");
// import { ApiService } from '../service/ApiService';
var hyper_utils_1 = require("./hyper-utils");
var app_config_1 = require("./app-config");
var sockets = [];
var socket;
var options = {
    WebSocket: WebSocket,
    connectionTimeout: 1000,
    maxRetries: 10,
};
var pushStreamService = {
    subAllChats: function (userChats) {
        pushStreamService.closeAllSocket();
        for (var i = 0; i < userChats.length; i++) {
            pushStreamService.subChat(userChats[i].id);
        }
    },
    subChannelSystem: function () {
        pushStreamService.subChat('CHANNEL_ACTIVITIES');
    },
    subChat: function (userID) {
        console.log('test_socket_initial:', userID, '__', app_config_1.APP_CONFIGS.URL_PUSH_STREAM);
        socket = new reconnecting_websocket_1.default("ws://" + app_config_1.APP_CONFIGS.URL_PUSH_STREAM + "/ws?Channels=" + userID, [], options);
        socket.onopen = function () {
            // connection opened
            console.log('test_socket_user_id:', userID);
            console.log("test_ws://" + app_config_1.APP_CONFIGS.URL_PUSH_STREAM + "/ws?Channels=" +
                userID);
        };
        socket.onmessage = function (e) {
            pushStreamService.messageReceived(decodeURIComponent(JSON.parse(e.data).text));
        };
        socket.onerror = function (e) {
            // an error occurred
            console.log('test_socket_err: ', e);
            // socket.close();
            // clearInterval();
            // setTimeout(function() {
            //   pushStreamService.subChat(chatId);
            // }, 1000);
        };
        socket.onclose = function (e) {
            console.log('test_Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        };
        // sockets.push(ws);
    },
    closeSocket: function () {
        console.log('test_closeSocket');
        socket.close();
    },
    closeAllSocket: function () {
        console.log('test_closeAllSocket');
        sockets.map(function (s) { return s.close(); });
    },
    // Handler xử lý message lắng nghe từ PushStream khi có message mới
    messageReceived: function (text) { return __awaiter(void 0, void 0, void 0, function () {
        var newMessage, mes, user, new_user_chat, userId, remove_msg;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            newMessage = JSON.parse(text);
            console.log('test_messageReceived_1' + JSON.stringify(newMessage));
            if (hyper_utils_1.HyperUtils.isNotEmpty(newMessage)) {
                switch (newMessage.type) {
                    // case PushStreamTypes.NEW_MESSENGER: {
                    //   let mes: IHyperMessage = {};
                    //   let user: User = {};
                    //   if (newMessage && newMessage.value) {
                    //     user.id = newMessage.value?.user?.id;
                    //     user._id = newMessage.value?.user?.id;
                    //     user.username = newMessage.value?.user?.username;
                    //     user.avatar_url = 'https://placeimg.com/960/540/any';
                    //     mes._id = newMessage.value?.id;
                    //     mes.chatId = newMessage.value?.chatId;
                    //     mes.createdAt = newMessage.value?.modifiedDate;
                    //     mes.type = newMessage.value?.type;
                    //     mes.user = user;
                    //     mes.path = newMessage.value?.path;
                    //     mes.reply = newMessage.value?.replyMess;
                    //     mes.fileExtension = newMessage.value?.fileExtension;
                    //     mes.attachment = newMessage.value.attachment;
                    //     if (newMessage.value.type === KindOfMsg.TYPE_IMAGE) {
                    //       mes.image = `http://172.16.40.43:9000/preview/+${newMessage.value?.path}`;
                    //       mes.text = newMessage?.value?.message;
                    //     } else {
                    //       mes.text = newMessage?.value?.message;
                    //     }
                    //   }
                    //   const state = store?.getState();
                    //   const myId = state.userInfo?.user?.id;
                    //   switch (mes?.type) {
                    //     case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
                    //       const otherId = user.id || user._id;
                    //       console.log('test_TYPE_VIDEO_CALL_INCOMING:', otherId, '__', myId);
                    //       if (myId != otherId) {
                    //         NavigationService.navigate(IncomingCallScreen, {
                    //           type: KindOfMsg.TYPE_VIDEO_CALL_INCOMING,
                    //           user: user,
                    //           chatInfo: mes,
                    //           timeStart: newMessage?.value?.timeStart,
                    //         });
                    //       }
                    //       break;
                    //     case KindOfMsg.TYPE_VIDEO_CALL_ACCEPT:
                    //       console.log(
                    //         'test_TYPE_VIDEO_CALL_ACCEPT: ',
                    //         newMessage,
                    //         ', isMe: ',
                    //         myId === newMessage.value?.receiverId
                    //       );
                    //       if (myId === newMessage.value?.receiverId) {
                    //         NavigationService.navigate(VideoCallScreen, {
                    //           chatInfo: {
                    //             ...state.userInfo?.user,
                    //             ...{ chatId: newMessage.value?.chatId },
                    //             ...{ senderId: newMessage.value?.senderId },
                    //           },
                    //           link: newMessage.value?.link,
                    //         });
                    //       }
                    //       break;
                    //     case KindOfMsg.TYPE_VIDEO_CALL_DENY:
                    //       console.log('test_TYPE_VIDEO_CALL_DENY: ', newMessage);
                    //       if (myId === newMessage.value?.receiverId) {
                    //         StatusBar.setBarStyle('dark-content');
                    //         NavigationService.pop();
                    //       }
                    //       break;
                    //     case KindOfMsg.TYPE_VIDEO_CALL_FINISH:
                    //       console.log('test_TYPE_VIDEO_CALL_FINISH: ', newMessage, ', myId: ', myId);
                    //       StatusBar.setBarStyle('dark-content');
                    //       if (myId === newMessage.value?.receiverId) {
                    //         NavigationService.pop();
                    //       } else {
                    //         NavigationService.popMany(2);
                    //       }
                    //       break;
                    //     default:
                    //       EventBus.getInstance().post({
                    //         type: EventBusName.INCOMING_MESSAGE,
                    //         payload: mes,
                    //       });
                    //       break;
                    //   }
                    //   break;
                    // }
                    case push_stream_types_1.PushStreamTypes.NEW_MESSENGER: {
                        mes = {};
                        user = {};
                        if (newMessage && newMessage.value) {
                            // user.id = newMessage.value?.user?.id;
                            // user._id = newMessage.value?.user?.id;
                            // user.username = newMessage.value?.user?.username;
                            // user.avatar_url = 'https://placeimg.com/960/540/any';
                            user.id = (_a = newMessage.value) === null || _a === void 0 ? void 0 : _a.user;
                            user._id = (_b = newMessage.value) === null || _b === void 0 ? void 0 : _b.user;
                            user.username = 'web';
                            // mes._id = newMessage.value?.id;
                            mes._id = hyper_utils_1.HyperUtils.genRandomID(16);
                            mes.chatId = (_c = newMessage.value) === null || _c === void 0 ? void 0 : _c.chatId;
                            mes.createdAt = (_d = newMessage.value) === null || _d === void 0 ? void 0 : _d.createdAt;
                            // mes.type = newMessage.value?.type;
                            mes.user = user;
                            // mes.path = newMessage.value?.path;
                            // mes.reply = newMessage.value?.replyMess;
                            // mes.fileExtension = newMessage.value?.fileExtension;
                            // mes.attachment = newMessage.value.attachment;
                            // if (newMessage.value.type === KindOfMsg.TYPE_IMAGE) {
                            //   mes.image = `http://172.16.40.43:9000/preview/+${newMessage.value?.path}`;
                            //   mes.text = newMessage?.value?.message;
                            // } else {
                            mes.text = (_e = newMessage === null || newMessage === void 0 ? void 0 : newMessage.value) === null || _e === void 0 ? void 0 : _e.message;
                            // }
                        }
                        event_bus_1.default.getInstance().post({
                            type: event_bus_1.EventBusName.INCOMING_MESSAGE,
                            payload: mes,
                        });
                        break;
                    }
                    case push_stream_types_1.PushStreamTypes.UPDATED_STATUS_USER:
                        event_bus_1.default.getInstance().post({
                            type: event_bus_1.EventBusName.UPDATE_STATUS_USER,
                            payload: newMessage.value,
                        });
                        break;
                    case push_stream_types_1.PushStreamTypes.NEW_USER_CHAT:
                        new_user_chat = newMessage === null || newMessage === void 0 ? void 0 : newMessage.value;
                        userId = new_user_chat.userId || -1;
                        if (userId === -1)
                            break;
                        event_bus_1.default.getInstance().post({
                            type: event_bus_1.EventBusName.NEW_USER_CHAT,
                            payload: new_user_chat,
                        });
                        break;
                    case push_stream_types_1.PushStreamTypes.TYPE_DELETED_MESSENGER:
                        remove_msg = newMessage === null || newMessage === void 0 ? void 0 : newMessage.value;
                        event_bus_1.default.getInstance().post({
                            type: event_bus_1.EventBusName.TYPE_DELETED_MESSENGER,
                            payload: remove_msg,
                        });
                        //Reload list user chat
                        event_bus_1.default.getInstance().post({
                            type: event_bus_1.EventBusName.RELOAD_LIST_CHAT,
                            payload: {},
                        });
                        break;
                    default: {
                        break;
                    }
                }
            }
            return [2 /*return*/];
        });
    }); },
};
exports.pushStreamService = pushStreamService;
