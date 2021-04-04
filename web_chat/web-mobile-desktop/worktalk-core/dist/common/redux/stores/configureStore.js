"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../reducers/index");
var redux_logger_1 = require("redux-logger");
var redux_1 = require("redux");
function configureStore(sagaMiddleware) {
    // if (__DEV__) {
    return redux_1.createStore(index_1.default, redux_1.applyMiddleware(sagaMiddleware, redux_logger_1.createLogger()));
    // }
    // return createStore(rootReducers, applyMiddleware(sagaMiddleware));
}
exports.default = configureStore;
