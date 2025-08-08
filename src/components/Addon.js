"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addon = void 0;
const icons_1 = require("@ant-design/icons");
const addons_1 = require("@storybook/addons");
const components_1 = require("@storybook/components");
const core_events_1 = require("@storybook/core-events");
const antd_1 = require("antd");
const react_1 = __importStar(require("react"));
const types_1 = require("../types");
const List_1 = require("./List");
const Addon = ({ active }) => {
    const [entries, setEntries] = (0, react_1.useState)([]);
    const onRequest = (data) => setEntries([...entries, { type: types_1.TYPES.REQ, data }]);
    const onResponse = (data) => setEntries([...entries, { type: types_1.TYPES.RES, data }]);
    const onResponseError = (data) => setEntries([...entries, { type: types_1.TYPES.RES_ERR, data }]);
    const onStoryChanged = () => setEntries([]);
    const stats = (0, react_1.useMemo)(() => ({
        req: entries.filter((entry) => [types_1.TYPES.REQ].includes(entry.type)).length,
        res: entries.filter((entry) => [types_1.TYPES.RES].includes(entry.type)).length,
        err: entries.filter((entry) => [types_1.TYPES.RES_ERR].includes(entry.type)).length,
    }), [entries]);
    (0, react_1.useEffect)(() => {
        addons_1.addons.getChannel().addListener(core_events_1.STORY_CHANGED, onStoryChanged);
        if (active) {
            addons_1.addons.getChannel().addListener(types_1.EVENTS.REQUEST, onRequest);
            addons_1.addons.getChannel().addListener(types_1.EVENTS.RESPONSE, onResponse);
            addons_1.addons.getChannel().addListener(types_1.EVENTS.RESPONSE_ERROR, onResponseError);
        }
        return () => {
            addons_1.addons.getChannel().removeListener(core_events_1.STORY_CHANGED, onStoryChanged);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.REQUEST);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.RESPONSE);
            addons_1.addons.getChannel().removeAllListeners(types_1.EVENTS.RESPONSE_ERROR);
        };
    }, [onRequest, onResponse, onResponseError]);
    return (react_1.default.createElement(components_1.AddonPanel, { active: active }, entries.length === 0 ? (react_1.default.createElement(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE })) : (react_1.default.createElement(antd_1.Row, { gutter: 16 },
        react_1.default.createElement(antd_1.Col, { span: 4 },
            react_1.default.createElement(antd_1.Card, null,
                react_1.default.createElement(antd_1.Statistic, { title: "Requests", value: stats.req, valueStyle: { color: 'blue' }, prefix: react_1.default.createElement(icons_1.UploadOutlined, null) })),
            react_1.default.createElement(antd_1.Card, null,
                react_1.default.createElement(antd_1.Statistic, { title: "Responses", value: stats.res, valueStyle: { color: 'green' }, prefix: react_1.default.createElement(icons_1.DownloadOutlined, null) })),
            react_1.default.createElement(antd_1.Card, null,
                react_1.default.createElement(antd_1.Statistic, { title: "Errors", value: stats.err, valueStyle: { color: 'red' }, prefix: react_1.default.createElement(icons_1.DownloadOutlined, null) }))),
        react_1.default.createElement(antd_1.Col, { span: 20 },
            react_1.default.createElement(List_1.List, { list: entries }))))));
};
exports.Addon = Addon;
