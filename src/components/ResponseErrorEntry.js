"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseErrorEntry = void 0;
const react_1 = __importDefault(require("react"));
const ResponseErrorEntry = ({ data }) => {
    return react_1.default.createElement("pre", { className: "pre" }, data.message);
};
exports.ResponseErrorEntry = ResponseErrorEntry;
