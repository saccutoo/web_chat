"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusName = void 0;
var rxjs_1 = require("rxjs");
var EventBusName;
(function (EventBusName) {
    EventBusName["INCOMING_MESSAGE"] = "INCOMING_MESSAGE";
    EventBusName["UPDATE_STATUS_USER"] = "UPDATE_STATUS_USER";
    EventBusName["NEW_USER_CHAT"] = "NEW_USER_CHAT";
    EventBusName["RELOAD_LIST_CHAT"] = "RELOAD_LIST_CHAT";
    EventBusName["TYPE_DELETED_MESSENGER"] = "TYPE_DELETED_MESSENGER";
    //Action message
    EventBusName["CHAT_DETAIL_ACTION_ANSWER"] = "CHAT_DETAIL_ACTION_ANSWER";
    EventBusName["CHAT_DETAIL_ACTION_EDIT"] = "CHAT_DETAIL_ACTION_EDIT";
    EventBusName["CHAT_DETAIL_ACTION_COPY"] = "CHAT_DETAIL_ACTION_COPY";
    EventBusName["CHAT_DETAIL_ACTION_REMOVE"] = "CHAT_DETAIL_ACTION_REMOVE";
})(EventBusName = exports.EventBusName || (exports.EventBusName = {}));
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.eventSubject = new rxjs_1.Subject();
    }
    EventBus.getInstance = function () {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    };
    Object.defineProperty(EventBus.prototype, "events", {
        get: function () {
            return this.eventSubject.asObservable();
        },
        enumerable: false,
        configurable: true
    });
    EventBus.prototype.post = function (event) {
        this.eventSubject.next(event);
    };
    return EventBus;
}());
exports.default = EventBus;
