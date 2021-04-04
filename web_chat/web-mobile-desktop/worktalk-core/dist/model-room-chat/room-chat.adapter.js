"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomChatAdapter = void 0;
var event_bus_1 = require("../common/event-bus");
/*
    Created by longdq
*/
// import { processRequestRespository } from 'core/common/networking/api-helper';
// import { pushStreamService } from 'core/common/push-stream-service';
// import { User } from 'types/user';
// import ListUserChatContainer from '../../features/list-user-chat/view/list-user-chat.screen';
// import { ListChatModel } from './list-user-chat.props';
// import ListUserChatServices from './list-user-chat.services';
var event_bus_2 = require("../common/event-bus");
var rxjs_1 = require("rxjs");
// export class ListUserChatAdapter {
//   ListUserChatContainer: ListUserChatContainer;
//   constructor(container: ListUserChatContainer) {
//     this.ListUserChatContainer = container;
//     //Init Socket
//     pushStreamService.subChat(this.ListUserChatContainer.props.userInfo?.user?.id);
//   }
//   getListUser = () => {
//     processRequestRespository(
//       ListUserChatServices.getInstance().getListUser(),
//       this.getListUserSuccess
//     );
//   };
//   getListUserSuccess = (res: User[]) => {
//     // console.log(res, 'data tra ve');
//     this.ListUserChatContainer.setState({
//       dataListUser: res,
//     });
//   };
//   getListChat = () => {
//     const { userInfo } = this.ListUserChatContainer.props;
//     let { page, ITEM_PAGE } = this.ListUserChatContainer;
//     // showLoading();
//     this.ListUserChatContainer.setState({
//       loading: true,
//     });
//     processRequestRespository(
//       ListUserChatServices.getInstance().getRoomChat(userInfo.user.id, ITEM_PAGE, page),
//       this.getListChatSuccess
//     );
//   };
//   getListChatSuccess = (res: ListChatModel[]) => {
//     this.ListUserChatContainer.setState({
//       loading: false,
//     });
//     // hideLoading();
//     console.log('test_list_user_page: ', this.ListUserChatContainer.page);
//     const newData =
//       this.ListUserChatContainer.page === 1
//         ? [...res]
//         : [...this.ListUserChatContainer.state.dataListChat, ...res];
//     this.ListUserChatContainer.setState(
//       {
//         dataListChat: newData,
//       },
//       () => {
//         console.log('test_list_user: ', this.ListUserChatContainer.state.dataListUser);
//       }
//     );
//   };
//   onRefresh = () => {
//     this.ListUserChatContainer.page = 1;
//     this.ListUserChatContainer.setState({
//       dataListChat: [],
//     });
//     this.getListChat();
//   };
//   onEndReached = () => {
//     console.log('test_onEndReached');
//     const { dataListChat } = this.ListUserChatContainer.state;
//     const { loading } = this.ListUserChatContainer.state;
//     let { page, ITEM_PAGE } = this.ListUserChatContainer;
//     if (loading || dataListChat.length < page * ITEM_PAGE) return;
//     this.ListUserChatContainer.page += 1;
//     this.getListChat();
//     //Call url with new page
//   };
// }
var api_helper_1 = require("../common/networking/api-helper");
var push_stream_service_1 = require("../common/push-stream-service");
var react_1 = require("react");
var room_chat_services_1 = require("./room-chat.services");
// import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
// import NavigationService from 'routers/navigation-service';
// import { IncomingCallScreen } from 'routers/screen-name';
exports.RoomChatAdapter = function (props) {
    var userInfo = props.userInfo;
    //Variables
    var subscriptions = new rxjs_1.Subscription();
    var focusListener = null;
    var page = 1;
    var ITEM_PAGE = 15;
    // States
    var _a = react_1.useState(), dataListUser = _a[0], setDataListUser = _a[1];
    // const [dataListChat, setDataListChat] = useState<ListChatModel[]>([]);
    var _b = react_1.useState([]), dataListChat = _b[0], setDataListChat = _b[1];
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    //Callback
    react_1.useEffect(function () {
        var _a;
        registerSubscriber();
        push_stream_service_1.pushStreamService.subChat((_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _a === void 0 ? void 0 : _a.id);
        api_helper_1.processRequestRespository(room_chat_services_1.default.getInstance().getListUser(), getListUserSuccess);
        getListChat();
        // getInfoVideoCall();
    }, []);
    react_1.useEffect(function () {
        return function () {
            subscriptions.unsubscribe();
        };
    }, []);
    //Logic
    function getListUserSuccess(res) {
        console.log("test_getListUserSuccess:", res);
        setDataListUser(res);
    }
    // Get list chat
    var getListChat = function () {
        var _a;
        // showLoading();
        // setIsLoading(true);
        api_helper_1.processRequestRespository(room_chat_services_1.default.getInstance().getRoomChat({
            userId: (_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.user) === null || _a === void 0 ? void 0 : _a.id,
            pageParams: { pageSize: ITEM_PAGE, page: page },
        }), getListChatSuccess);
    };
    var getListChatSuccess = function (res) {
        // setIsLoading(false);
        // hideLoading();
        console.log("test_list_user_page: ", page);
        // const newData: ListChatModel[] = page === 1 ? [...res] : [...dataListChat, ...res];
        var newData = page === 1 ? __spreadArrays(res) : __spreadArrays(dataListChat, res);
        setDataListChat(newData);
    };
    var registerSubscriber = function () {
        subscriptions.add(event_bus_2.default.getInstance().events.subscribe(function (res) {
            if (res.payload) {
                console.log("test_messageReceived_event_bus: ", res.payload);
                switch (res.type) {
                    // TODO
                    // case EventBusName.INCOMING_MESSAGE:
                    //   const msg: IMessage = res.payload;
                    //   let new_data = [...this.state.dataListChat];
                    //   const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
                    //   if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
                    //     const new_item = { ...new_data[index_item] };
                    //     new_item.messengers[0].message = msg?.text;
                    //     new_data.splice(index_item, 1);
                    //     new_data.splice(0, 0, new_item);
                    //   }
                    //   //Check new user
                    //   const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
                    //   if (exist_user === -1) {
                    //     this.ListUserChatAdapter.getListChat();
                    //     return;
                    //   }
                    //   //Sort
                    //   this.setState({
                    //     dataListChat: new_data,
                    //   });
                    //   break;
                    case event_bus_1.EventBusName.INCOMING_MESSAGE:
                        var msg = res.payload;
                        var new_data = __spreadArrays(dataListChat);
                        new_data.push(msg);
                        // const index_item = new_data.map((item) => item?.id).indexOf(msg?.chatId);
                        // if (index_item != -1 && new_data[index_item] && new_data[index_item].messengers[0]) {
                        //   const new_item = { ...new_data[index_item] };
                        //   new_item.messengers[0].message = msg?.text;
                        //   new_data.splice(index_item, 1);
                        //   new_data.splice(0, 0, new_item);
                        // }
                        //Check new user
                        // const exist_user = new_data.map((item) => item?.contact?.id).indexOf(msg?.user?._id);
                        // if (exist_user === -1) {
                        //   this.ListUserChatAdapter.getListChat();
                        //   return;
                        // }
                        //Sort
                        setDataListChat(new_data);
                        break;
                    case event_bus_1.EventBusName.NEW_USER_CHAT:
                        var newUserChat = res.payload;
                        //Check new user
                        var exist_user1 = dataListChat
                            .map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.contact) === null || _a === void 0 ? void 0 : _a.id; })
                            .indexOf(newUserChat === null || newUserChat === void 0 ? void 0 : newUserChat.userId);
                        if (exist_user1 === -1) {
                            getListChat();
                        }
                        break;
                    case event_bus_1.EventBusName.UPDATE_STATUS_USER:
                        var user = res.payload;
                        // let new_data_status: ListChatModel[] = [...dataListChat];
                        var new_data_status = __spreadArrays(dataListChat);
                        var index_item_status = new_data_status
                            .map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.contact) === null || _a === void 0 ? void 0 : _a.id; })
                            .indexOf(user.id);
                        if (index_item_status != -1 &&
                            new_data_status[index_item_status]) {
                            var new_item = __assign({}, new_data_status[index_item_status]);
                            new_item.statusUser = user.statusUser;
                            new_data_status.splice(index_item_status, 1, new_item);
                        }
                        setDataListChat(new_data_status);
                        break;
                    case event_bus_1.EventBusName.RELOAD_LIST_CHAT:
                        getListChat();
                        return;
                }
            }
        }));
    };
    var onRefresh = function () {
        page = 1;
        setDataListChat([]);
        getListChat();
    };
    var onEndReached = function () {
        console.log("test_onEndReached");
        // if (isLoading || dataListChat.length < page * ITEM_PAGE) return;
        page += 1;
        getListChat();
        //Call url with new page
    };
    return {
        // isLoading,
        page: page,
        ITEM_PAGE: ITEM_PAGE,
        // setIsLoading,
        dataListUser: dataListUser,
        dataListChat: dataListChat,
        onRefresh: onRefresh,
        onEndReached: onEndReached,
        registerSubscriber: registerSubscriber,
        getListChat: getListChat,
        getListUserSuccess: getListUserSuccess,
    };
};
