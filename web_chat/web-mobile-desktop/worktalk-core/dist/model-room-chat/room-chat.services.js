"use strict";
/*
    Created by longdq
*/
Object.defineProperty(exports, "__esModule", { value: true });
// import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
var api_helper_1 = require("../common/networking/api-helper");
var app_config_1 = require("../common/app-config");
var url_paths_1 = require("../common/networking/url-paths");
var RoomChatServices = /** @class */ (function () {
    function RoomChatServices() {
        this.getListUser = function () {
            return api_helper_1.post(url_paths_1.URL_PATHS.LIST_USER, {}, true);
        };
        this.getRoomChat = function (params) {
            var _a, _b;
            console.log('test_get_chat_room');
            var tmpPage = ((_a = params === null || params === void 0 ? void 0 : params.pageParams) === null || _a === void 0 ? void 0 : _a.page) || app_config_1.APP_CONFIGS.DEFAULT_NUMBER_PAGE;
            var tmpPageSize = ((_b = params === null || params === void 0 ? void 0 : params.pageParams) === null || _b === void 0 ? void 0 : _b.pageSize) || app_config_1.APP_CONFIGS.ITEM_PER_PAGE;
            return api_helper_1.fetch(url_paths_1.URL_PATHS.LIST_ROOM_CHAT, { userId: params.userId, pageSize: tmpPageSize, page: tmpPage }, true);
        };
    }
    RoomChatServices.getInstance = function () {
        if (!RoomChatServices.instance) {
            RoomChatServices.instance = new RoomChatServices();
        }
        return RoomChatServices.instance;
    };
    return RoomChatServices;
}());
exports.default = RoomChatServices;
