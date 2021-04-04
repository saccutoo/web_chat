"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var user_reducers_1 = require("./user.reducers");
var rootReducers = redux_1.combineReducers({
    userInfo: user_reducers_1.userReducers,
});
exports.default = rootReducers;
