"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_USER = exports.UPDATE_USER = exports.LOGIN_MOBILE = void 0;
/**
 * Actions
 */
__exportStar(require("./user.actions"), exports);
/**
 * Types
 */
// Authen
exports.LOGIN_MOBILE = 'LOGIN_MOBILE';
exports.UPDATE_USER = 'UPDATE_USER';
exports.REMOVE_USER = 'REMOVE_USER';
