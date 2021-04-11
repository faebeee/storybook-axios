"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = exports.TYPES = void 0;
var TYPES;
(function (TYPES) {
    TYPES["REQ"] = "request";
    TYPES["RES"] = "response";
    TYPES["RES_ERR"] = "response_error";
})(TYPES = exports.TYPES || (exports.TYPES = {}));
var EVENTS;
(function (EVENTS) {
    EVENTS["REQUEST"] = "axios-request";
    EVENTS["RESPONSE"] = "axios-response";
    EVENTS["RESPONSE_ERROR"] = "axios-response-error";
    EVENTS["UPDATE_COUNT"] = "axios-update-count";
    EVENTS["UPDATE_RESPONSE_CODE"] = "axios-update-response-code";
})(EVENTS = exports.EVENTS || (exports.EVENTS = {}));
