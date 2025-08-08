export var TYPES;
(function (TYPES) {
    TYPES["REQ"] = "request";
    TYPES["RES"] = "response";
    TYPES["RES_ERR"] = "response_error";
})(TYPES || (TYPES = {}));
export var EVENTS;
(function (EVENTS) {
    EVENTS["REQUEST"] = "axios-request";
    EVENTS["RESPONSE"] = "axios-response";
    EVENTS["RESPONSE_ERROR"] = "axios-response-error";
    EVENTS["UPDATE_COUNT"] = "axios-update-count";
})(EVENTS || (EVENTS = {}));
