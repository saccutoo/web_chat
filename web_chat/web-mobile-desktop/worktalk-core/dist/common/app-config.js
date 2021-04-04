"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIGS = void 0;
var env = null;
try {
    console.log('test_app_config_starting...');
    env = require("react-native-config");
}
catch (ex) {
    console.log('test_app_config_ex: ', ex);
}
console.log('test_app_config...', env);
var IS_WEB = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.REACT_APP_IP_ADDRESS_API) !== undefined;
console.log('test_app_config_rs:', IS_WEB);
console.log('test_app_config_env_mobile:', (_b = env === null || env === void 0 ? void 0 : env.Config) === null || _b === void 0 ? void 0 : _b.REACT_APP_IP_ADDRESS_URL);
var PROTOCOL = "http://";
var HOST_API = IS_WEB
    ? process.env.REACT_APP_IP_ADDRESS_API
    : env.Config.REACT_APP_IP_ADDRESS_API;
var PORT_API = IS_WEB
    ? process.env.REACT_APP_IP_ADDRESS_PORT
    : env.Config.REACT_APP_IP_ADDRESS_PORT;
var REACT_APP_IP_ADDRESS_URL = IS_WEB
    ? process.env.REACT_APP_IP_ADDRESS_URL
    : env.Config.REACT_APP_IP_ADDRESS_URL;
var PUSH_STREAM_URL = IS_WEB
    ? process.env.REACT_APP_PUSH_STREAM_IP
    : env.Config.REACT_APP_PUSH_STREAM_IP;
var REACT_APP_PUSH_STREAM_PROTOCOL = IS_WEB
    ? process.env.REACT_APP_PUSH_STREAM_PROTOCOL
    : env.Config.REACT_APP_PUSH_STREAM_PROTOCOL;
var REACT_APP_PUSH_STREAM_URL = IS_WEB
    ? process.env.REACT_APP_PUSH_STREAM_URL
    : env.Config.REACT_APP_PUSH_STREAM_URL;
var PUSH_STREAM_PORT = IS_WEB
    ? process.env.REACT_APP_PUSH_STREAM_PORT
    : env.Config.REACT_APP_PUSH_STREAM_PORT;
// const HOST_FILE = "http://172.20.80.19:9002";
// const PATH_FILE = "/api/file/GetFileStreamById?guid=";
var APP_CONFIGS = {
    DEFAULT_NUMBER_PAGE: 1,
    ITEM_PER_PAGE: 20,
    CHAT_ITEM_PER_PAGE: 20,
    // URL_API: `${PROTOCOL}${HOST_API}:${PORT_API}`,
    // URL_PUSH_STREAM: `${HOST_API}:${PUSH_STREAM_PORT}`,
    URL_API: "" + REACT_APP_IP_ADDRESS_URL,
    PUSH_STREAM_PROTOCOL: "" + REACT_APP_PUSH_STREAM_PROTOCOL,
    // URL_PUSH_STREAM: `${REACT_APP_PUSH_STREAM_PROTOCOL}://${REACT_APP_PUSH_STREAM_URL}`,
    URL_PUSH_STREAM: "ws://" + HOST_API + ":" + PUSH_STREAM_PORT,
};
exports.APP_CONFIGS = APP_CONFIGS;
