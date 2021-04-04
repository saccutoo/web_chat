"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_saga_1 = require("redux-saga");
var configureStore_1 = require("./stores/configureStore");
var sagas_1 = require("./sagas");
var sagaMiddleware = redux_saga_1.default();
var store = configureStore_1.default(sagaMiddleware);
sagaMiddleware.run(sagas_1.default);
exports.default = store;
