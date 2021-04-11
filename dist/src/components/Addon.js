"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addon = void 0;
var icons_1 = require("@ant-design/icons");
var addons_1 = require("@storybook/addons");
var api_1 = require("@storybook/api");
var components_1 = require("@storybook/components");
var core_events_1 = require("@storybook/core-events");
var antd_1 = require("antd");
var react_1 = __importStar(require("react"));
var types_1 = require("../types");
var List_1 = require("./List");
var Addon = function (_a) {
    var active = _a.active;
    var _b = react_1.useState([]), entries = _b[0], setEntries = _b[1];
    var onRequest = function (data) { return setEntries(__spreadArrays(entries, [{ type: types_1.TYPES.REQ, data: data }])); };
    var onResponse = function (data) { return setEntries(__spreadArrays(entries, [{ type: types_1.TYPES.RES, data: data }])); };
    var onResponseError = function (data) { return setEntries(__spreadArrays(entries, [{ type: types_1.TYPES.RES_ERR, data: data }])); };
    var onStoryChanged = function () {
        setEntries([]);
        // Reset on story changes
        addons_1.addons.getChannel().emit(types_1.EVENTS.UPDATE_RESPONSE_CODE, null);
    };
    var _c = api_1.useGlobals(), updateGlobals = _c[1];
    var stats = react_1.useMemo(function () { return ({
        req: entries.filter(function (entry) { return [types_1.TYPES.REQ].includes(entry.type); }).length,
        res: entries.filter(function (entry) { return [types_1.TYPES.RES].includes(entry.type); }).length,
        err: entries.filter(function (entry) { return [types_1.TYPES.RES_ERR].includes(entry.type); }).length,
    }); }, [entries]);
    react_1.useEffect(function () {
        addons_1.addons.getChannel().addListener(core_events_1.STORY_CHANGED, onStoryChanged);
        if (active) {
            addons_1.addons.getChannel().addListener(types_1.EVENTS.REQUEST, onRequest);
            addons_1.addons.getChannel().addListener(types_1.EVENTS.RESPONSE, onResponse);
            addons_1.addons.getChannel().addListener(types_1.EVENTS.RESPONSE_ERROR, onResponseError);
        }
        return function () {
            addons_1.addons.getChannel().removeListener(core_events_1.STORY_CHANGED, onStoryChanged);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.REQUEST);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.RESPONSE);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.RESPONSE_ERROR);
        };
    }, [onRequest, onResponse, onResponseError]);
    var onChangeResponseCode = function (data) {
        addons_1.addons.getChannel().emit(types_1.EVENTS.UPDATE_RESPONSE_CODE, parseInt(data.target.value));
    };
    return (react_1.default.createElement(components_1.AddonPanel, { active: active },
        react_1.default.createElement(antd_1.Row, { gutter: 16 },
            react_1.default.createElement(antd_1.Col, { span: 4 },
                react_1.default.createElement(antd_1.Card, null,
                    react_1.default.createElement(antd_1.Input, { addonBefore: "Status", defaultValue: "200", allowClear: true, onBlur: onChangeResponseCode })),
                react_1.default.createElement(antd_1.Card, null,
                    react_1.default.createElement(antd_1.Statistic, { title: "Requests", value: stats.req, valueStyle: { color: 'blue' }, prefix: react_1.default.createElement(icons_1.UploadOutlined, null) })),
                react_1.default.createElement(antd_1.Card, null,
                    react_1.default.createElement(antd_1.Statistic, { title: "Responses", value: stats.res, valueStyle: { color: 'green' }, prefix: react_1.default.createElement(icons_1.DownloadOutlined, null) })),
                react_1.default.createElement(antd_1.Card, null,
                    react_1.default.createElement(antd_1.Statistic, { title: "Errors", value: stats.err, valueStyle: { color: 'red' }, prefix: react_1.default.createElement(icons_1.DownloadOutlined, null) }))),
            react_1.default.createElement(antd_1.Col, { span: 20 }, entries.length === 0 ? react_1.default.createElement(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }) : (react_1.default.createElement(List_1.List, { list: entries }))))));
};
exports.Addon = Addon;
