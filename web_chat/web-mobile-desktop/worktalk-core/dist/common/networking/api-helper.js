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
exports.processRequestTrustRespository = exports.processRequestRespository = exports.postTokenFormDataTest = exports.postTokenTest = exports.postForm = exports.deletes = exports.postFormData = exports.put = exports.postFile = exports.post = exports.fetch = exports.checkToken = exports.removeUser = void 0;
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var axios_1 = require("axios");
var app_config_1 = require("../app-config");
// import { showAlert, TYPE } from 'libraries/dropdown-alert';
// import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
// import { Alert } from 'react-native';
// import env from 'react-native-config';
// import { translate } from 'res/languages';
// import AsyncStorageHelpers, { StorageKey } from '../../../helpers/async-storage-helpers';
// import { LoginMobileResponse } from '../../../features/login-old/view/components/login-form-wv/login-form-wv.props';
var status_1 = require("./status");
// const BASE_API =
//   process.env.REACT_APP_IP_ADDRESS_API === undefined
//     ? env.REACT_APP_IP_ADDRESS_API
//     : process.env.REACT_APP_IP_ADDRESS_API;
// const BASE_PORT =
//   process.env.REACT_APP_IP_ADDRESS_PORT === undefined
//     ? env.REACT_APP_IP_ADDRESS_PORT
//     : process.env.REACT_APP_IP_ADDRESS_PORT;
var instance = axios_1.default.create({
    baseURL: app_config_1.APP_CONFIGS.URL_API,
    // baseURL: url,
    timeout: 20 * 1000,
});
instance.interceptors.request.use(function (_config) { return requestHandler(_config); });
var requestHandler = function (request) {
    var _a;
    // if (__DEV__) {
    console.log("Request API - " + ((_a = request.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + ": " + request.baseURL + request.url, request.params, request.data);
    // }
    return request;
};
instance.interceptors.response.use(function (response) { return successHandler(response); }, function (error) { return errorHandler(error); });
var errorHandler = function (error) {
    // if (__DEV__) {
    console.log(error);
    // }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(__assign({}, error));
};
var successHandler = function (response) {
    // if (__DEV__) {
    console.log("Response API: " + response.config.url, response.data);
    // }
    return response.data;
};
function fetch(url, params, isAuth, isRaw) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, !isRaw
                        ? instance
                            .get(url, { params: params, headers: headers })
                            .then(function (res) { return checkToken(res); })
                            .catch(function (error) { return error; })
                        : axios_1.default
                            .create({
                            // baseURL: `${env.REACT_APP_IP_ADDRESS_API}:${env.REACT_APP_IP_ADDRESS_PORT}`,
                            timeout: 20 * 1000,
                        })
                            .get(url, { params: params, headers: headers })
                            .then(function (res) {
                            console.log('test_fetch_raw_success: ', res);
                            return res;
                        })
                            .catch(function (error) {
                            console.log('test_fetch_raw_fail: ', error);
                        })];
            }
        });
    });
}
exports.fetch = fetch;
function post(url, data, isAuth, isRaw) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, !isRaw
                        ? instance
                            .post(url, __assign({}, data), { headers: headers })
                            .then(function (res) { return checkToken(res); })
                            .catch(function (error) { return error; })
                        : axios_1.default
                            .create({
                            // baseURL: `${env.REACT_APP_IP_ADDRESS_API}:${env.REACT_APP_IP_ADDRESS_PORT}`,
                            timeout: 20 * 1000,
                        })
                            .post(url, { data: data, headers: headers })
                            .then(function (res) {
                            console.log('test_post_raw_success: ', res);
                            return res;
                        })
                            .catch(function (error) {
                            console.log('test_post_raw_fail: ', url, '__', data, '__', headers);
                            console.log('test_post_raw_fail_1: ', error);
                        })];
            }
        });
    });
}
exports.post = post;
function postFile(url, data, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            headers = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            };
            return [2 /*return*/, instance
                    .post(url, data, { headers: headers })
                    .then(function (res) { return checkToken(res); })
                    .catch(function (error) { return error; })];
        });
    });
}
exports.postFile = postFile;
//TEST
function postTokenTest(url, body, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, data;
        return __generator(this, function (_a) {
            headers = null;
            data = {};
            if (isAuth) {
                headers = { Authorization: "Bearer " + (body ? body.token : '') };
            }
            return [2 /*return*/, instance
                    .post(url, __assign({}, data), { headers: headers })
                    .then(function (res) { return checkToken(res); })
                    .catch(function (error) { return error; })];
        });
    });
}
exports.postTokenTest = postTokenTest;
function postTokenFormDataTest(url, body, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, data, frm;
        return __generator(this, function (_a) {
            headers = null;
            data = new FormData();
            frm = body.frm;
            Object.keys(frm).forEach(function (key) {
                if (frm[key] instanceof Array) {
                    frm[key].forEach(function (value) {
                        data.append(key + "[]", value);
                    });
                }
                else {
                    data.append(key, frm[key]);
                }
            });
            if (isAuth) {
                headers = { Authorization: "Bearer " + (body ? body.token : '') };
            }
            return [2 /*return*/, instance
                    .post(url, __assign({}, data), { headers: headers })
                    .then(function (res) { return checkToken(res); })
                    .catch(function (error) { return error; })];
        });
    });
}
exports.postTokenFormDataTest = postTokenFormDataTest;
//TEST
function deletes(url, data, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, instance
                        .delete(url, { data: __assign({}, data), headers: __assign({}, headers) })
                        .then(function (res) { return checkToken(res); })
                        .catch(function (error) { return error; })];
            }
        });
    });
}
exports.deletes = deletes;
function put(url, data, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, instance
                        .put(url, __assign({}, data), { headers: headers })
                        .then(function (res) { return checkToken(res); })
                        .catch(function (error) { return error; })];
            }
        });
    });
}
exports.put = put;
function postFormData(url, body, isAuth) {
    if (isAuth === void 0) { isAuth = false; }
    return __awaiter(this, void 0, void 0, function () {
        var data, headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new FormData();
                    Object.keys(body).forEach(function (key) {
                        if (body[key] instanceof Array) {
                            body[key].forEach(function (value) {
                                data.append(key + "[]", value);
                            });
                        }
                        else {
                            data.append(key, body[key]);
                        }
                    });
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, instance
                        .post(url, data, { headers: headers })
                        .then(function (res) { return checkToken(res); })
                        .catch(function (error) { return error; })];
            }
        });
    });
}
exports.postFormData = postFormData;
function postForm(url, data, isAuth) {
    return __awaiter(this, void 0, void 0, function () {
        var headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = null;
                    if (!isAuth) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHeader()];
                case 1:
                    headers = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, instance
                        .post(url, data, { headers: headers })
                        .then(function (res) { return checkToken(res); })
                        .catch(function (error) { return error; })];
            }
        });
    });
}
exports.postForm = postForm;
// TODO
// Get Token
function createHeader() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // const setting: any = await getUserInfo();
            // return {
            //   Authorization: `Bearer ${setting ? setting.token : ''}`,
            // };
            return [2 /*return*/, {}];
        });
    });
}
function removeUser() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.removeUser = removeUser;
// TODO
function checkToken(res) {
    // if (res && res.code === TOKEN_EXPIRED) {
    //   return new Promise<Object>((resolve, reject) => {
    //     Alert.alert(
    //       translate('notify'),
    //       translate('tokenInvalid'),
    //       [{ text: translate('common.yes'), onPress: () => {} }],
    //       { cancelable: false }
    //     );
    //   });
    // } else return res;
    return res;
}
exports.checkToken = checkToken;
//Process request
function processRequestRespository(reqPromise, onSuccess, onfail, isShowAlert, isShowLoading) {
    if (isShowAlert === void 0) { isShowAlert = true; }
    if (isShowLoading === void 0) { isShowLoading = true; }
    // isShowLoading && showLoading();
    reqPromise
        .then(function (data) {
        // hideLoading();
        switch (data === null || data === void 0 ? void 0 : data.status) {
            case status_1.SUCCESS:
                // isShowAlert && showAlert(TYPE.SUCCESS, translate('warning.success'), data.message);
                onSuccess && onSuccess(data.data);
                break;
            default:
                onfail && onfail(data);
                break;
        }
        //TODO: update sso
        onSuccess && onSuccess(data.data);
    })
        .catch(function (e) {
        // hideLoading();
        console.log('tes_err_data_ex: ', e);
        // isShowAlert && showAlert(TYPE.WARN, translate('warning.warning'), e.message);
        onfail && onfail(e);
    });
}
exports.processRequestRespository = processRequestRespository;
function processRequestTrustRespository(reqPromise, onSuccess, onfail, isShowAlert, isShowLoading) {
    if (isShowAlert === void 0) { isShowAlert = true; }
    if (isShowLoading === void 0) { isShowLoading = true; }
    // isShowLoading && showLoading();
    reqPromise
        .then(function (data) {
        // hideLoading();
        switch (data === null || data === void 0 ? void 0 : data.status) {
            case status_1.SUCCESS:
                // isShowAlert && showAlert(TYPE.SUCCESS, translate('warning.success'), data.message);
                onSuccess && onSuccess(data);
                break;
            default:
                onfail && onfail(data);
                break;
        }
        //TODO: update sso
        onSuccess && onSuccess(data);
    })
        .catch(function (e) {
        // hideLoading();
        console.log('tes_err_data_ex: ', e);
        // isShowAlert && showAlert(TYPE.WARN, translate('warning.warning'), e.message);
        onfail && onfail(e);
    });
}
exports.processRequestTrustRespository = processRequestTrustRespository;
