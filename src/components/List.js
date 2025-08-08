"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const icons_1 = require("@ant-design/icons");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const types_1 = require("../types");
const RequestEntry_1 = require("./RequestEntry");
const ResponseEntry_1 = require("./ResponseEntry");
const ResponseErrorEntry_1 = require("./ResponseErrorEntry");
const List = ({ list }) => {
    const items = list.map((entry, idx) => {
        var _a, _b;
        const key = String(idx);
        switch (entry.type) {
            case types_1.TYPES.REQ:
                return {
                    key,
                    label: `${(_a = entry.data.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${entry.data.url}`,
                    children: react_1.default.createElement(RequestEntry_1.RequestEntry, { data: entry.data }),
                    extra: react_1.default.createElement(icons_1.UploadOutlined, { style: { color: 'blue' } }),
                };
            case types_1.TYPES.RES:
                return {
                    key,
                    children: react_1.default.createElement(ResponseEntry_1.ResponseEntry, { data: entry.data }),
                    label: `${entry.data.status} ${entry.data.config.url}`,
                    extra: react_1.default.createElement(icons_1.DownloadOutlined, { style: { color: 'green' } }),
                };
            case types_1.TYPES.RES_ERR:
                return {
                    key,
                    label: `ERR ${(_b = entry.data.config) === null || _b === void 0 ? void 0 : _b.url}`,
                    children: react_1.default.createElement(ResponseErrorEntry_1.ResponseErrorEntry, { data: entry.data }),
                    extra: react_1.default.createElement(icons_1.DownloadOutlined, { style: { color: 'red' } }),
                };
        }
    });
    return react_1.default.createElement(antd_1.Collapse, { items: items });
};
exports.List = List;
