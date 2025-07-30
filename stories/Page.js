"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var get_axios_1 = require("../utils/get-axios");
var Page = function (_a) {
    var url = _a.url, method = _a.method, config = _a.config;
    var execRequest = function () {
        (0, get_axios_1.getAxios)()[method](url, config);
    };
    return (react_1.default.createElement(antd_1.Button, { type: "primary", onClick: execRequest }, "Load"));
};
exports.Page = Page;
