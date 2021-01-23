"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var antd_1 = require("antd");
var react_1 = __importDefault(require("react"));
var types_1 = require("../types");
var RequestEntry_1 = require("./RequestEntry");
var ResponseEntry_1 = require("./ResponseEntry");
var ResponseErrorEntry_1 = require("./ResponseErrorEntry");
var List = function (_a) {
    var _b;
    var list = _a.list;
    var MAP = (_b = {},
        _b[types_1.TYPES.REQ] = function (entry, index) { return react_1.default.createElement(RequestEntry_1.RequestEntry, { data: entry.data, key: index }); },
        _b[types_1.TYPES.RES] = function (entry, index) { return react_1.default.createElement(ResponseEntry_1.ResponseEntry, { data: entry.data, key: index }); },
        _b[types_1.TYPES.RES_ERR] = function (entry, index) { return react_1.default.createElement(ResponseErrorEntry_1.ResponseErrorEntry, { data: entry.data, key: index }); },
        _b);
    return (react_1.default.createElement(antd_1.Collapse, null, list.map(function (entry, idx) {
        return MAP[entry.type](entry, idx);
    })));
};
exports.List = List;
