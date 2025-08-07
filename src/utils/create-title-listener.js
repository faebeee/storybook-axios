"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTitleListener = void 0;
const types_1 = require("../types");
function createTitleListener(api) {
    let requestCount = 0;
    let responseCount = 0;
    let errorCount = 0;
    api.on(types_1.EVENTS.UPDATE_COUNT, ({ entries }) => {
        requestCount = entries.filter((entry) => [types_1.TYPES.REQ].includes(entry.type)).length;
        responseCount = entries.filter((entry) => [types_1.TYPES.RES].includes(entry.type)).length;
        errorCount = entries.filter((entry) => [types_1.TYPES.RES_ERR].includes(entry.type)).length;
    });
    return () => `Axios (${requestCount} / ${responseCount} / ${errorCount})`;
}
exports.createTitleListener = createTitleListener;
