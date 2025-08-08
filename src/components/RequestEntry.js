"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEntry = void 0;
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const Title_1 = __importDefault(require("antd/lib/typography/Title"));
const RequestEntry = ({ data }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Title_1.default, { level: 2 }, "Request"),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Headers"),
        react_1.default.createElement("pre", { className: "pre" }, JSON.stringify(data.headers, null, 2)),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Data"),
        react_1.default.createElement("pre", { className: "pre" }, JSON.stringify(data.data, null, 2)),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Params"),
        react_1.default.createElement("pre", { className: "pre" }, JSON.stringify(data.params, null, 2))));
};
exports.RequestEntry = RequestEntry;
