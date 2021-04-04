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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReducers = void 0;
var index_1 = require("../actions/index");
var initialState = {};
// export const userReducers = (state: UserState = initialState, action: UserAction): UserState => {
exports.userReducers = function (state, action) {
    if (state === void 0) { state = initialState; }
    console.log('test_action_reducer: ', action.payload, action.data);
    switch (action.type) {
        case index_1.UPDATE_USER:
            var userInfo = action.payload || action.data;
            return __assign(__assign({}, state), userInfo);
        case index_1.REMOVE_USER:
            state = {};
            return state;
        default:
            return state;
    }
};
