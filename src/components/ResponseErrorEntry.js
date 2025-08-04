"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorEntry = void 0;
var react_1 = __importDefault(require("react"));
var ResponseErrorEntry = function (_a) {
    var data = _a.data;
    return react_1.default.createElement("pre", { className: "pre" }, data.message);
};
exports.ResponseErrorEntry = ResponseErrorEntry;
