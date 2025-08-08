"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function serializeFormData(formData) {
    const obj = {};
    formData.forEach((val, key) => {
        obj[key] = val;
    });
    return obj;
}
exports.default = serializeFormData;
