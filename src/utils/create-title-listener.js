"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTitleListener = void 0;
var types_1 = require("../types");
function createTitleListener(api) {
    var requestCount = 0;
    var responseCount = 0;
    var errorCount = 0;
    api.on(types_1.EVENTS.UPDATE_COUNT, function (_a) {
        var entries = _a.entries;
        requestCount = entries.filter(function (entry) { return [types_1.TYPES.REQ].includes(entry.type); }).length;
        responseCount = entries.filter(function (entry) { return [types_1.TYPES.RES].includes(entry.type); }).length;
        errorCount = entries.filter(function (entry) { return [types_1.TYPES.RES_ERR].includes(entry.type); }).length;
    });
    return function () { return "Axios (" + requestCount + " / " + responseCount + " / " + errorCount + ")"; };
}
exports.createTitleListener = createTitleListener;
