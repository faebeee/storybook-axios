"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEntry = void 0;
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var Title_1 = __importDefault(require("antd/lib/typography/Title"));
var Panel = antd_1.Collapse.Panel;
var icons_1 = require("@ant-design/icons");
var RequestEntry = function (_a) {
    var data = _a.data, rest = __rest(_a, ["data"]);
    var title = data.method.toUpperCase() + " " + data.url;
    return (react_1.default.createElement(Panel, __assign({}, rest, { header: title, key: data.url, extra: react_1.default.createElement(icons_1.UploadOutlined, null) }),
        react_1.default.createElement(Title_1.default, { level: 2 }, "Request"),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Headers"),
        react_1.default.createElement("pre", { className: 'pre' }, JSON.stringify(data.headers, null, 2)),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Data"),
        react_1.default.createElement("pre", { className: 'pre' }, JSON.stringify(data.data, null, 2)),
        react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Params"),
        react_1.default.createElement("pre", { className: 'pre' }, JSON.stringify(data.params, null, 2))));
};
exports.RequestEntry = RequestEntry;
