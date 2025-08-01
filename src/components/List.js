"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var types_1 = require("../types");
var RequestEntry_1 = require("./RequestEntry");
var ResponseEntry_1 = require("./ResponseEntry");
var ResponseErrorEntry_1 = require("./ResponseErrorEntry");
var List = function (_a) {
    var list = _a.list;
    var items = list.map(function (entry, idx) {
        var _a, _b;
        var key = String(idx);
        switch (entry.type) {
            case types_1.TYPES.REQ:
                return {
                    key: key,
                    label: "".concat((_a = entry.data.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(), " ").concat(entry.data.url),
                    children: react_1.default.createElement(RequestEntry_1.RequestEntry, { data: entry.data }),
                    extra: react_1.default.createElement(icons_1.UploadOutlined, { style: { color: 'blue' } }),
                };
            case types_1.TYPES.RES:
                return {
                    key: key,
                    children: react_1.default.createElement(ResponseEntry_1.ResponseEntry, { data: entry.data }),
                    label: "".concat(entry.data.status, " ").concat(entry.data.config.url),
                    extra: react_1.default.createElement(icons_1.DownloadOutlined, { style: { color: 'green' } }),
                };
            case types_1.TYPES.RES_ERR:
                return {
                    key: key,
                    label: "ERR ".concat((_b = entry.data.config) === null || _b === void 0 ? void 0 : _b.url),
                    children: react_1.default.createElement(ResponseErrorEntry_1.ResponseErrorEntry, { data: entry.data }),
                    extra: react_1.default.createElement(icons_1.DownloadOutlined, { style: { color: 'red' } }),
                };
        }
    });
    return react_1.default.createElement(antd_1.Collapse, { items: items });
};
exports.List = List;
