"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serializeFormData(formData) {
    var obj = {};
    formData.forEach(function (val, key) {
        obj[key] = val;
    });
    return obj;
}
exports.default = serializeFormData;
