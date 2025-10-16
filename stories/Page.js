"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const get_axios_1 = require("../utils/get-axios");
const Page = ({ url, method, config }) => {
    const execRequest = () => {
        (0, get_axios_1.getAxios)()[method](url, config);
    };
    return (react_1.default.createElement(antd_1.Button, { type: "primary", onClick: execRequest }, "Load"));
};
exports.Page = Page;
