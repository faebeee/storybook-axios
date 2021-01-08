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
exports.decorator = void 0;
var react_1 = __importStar(require("react"));
var components_1 = require("@storybook/components");
var addons_1 = require("@storybook/addons");
var addons_2 = require("@storybook/addons");
var antd_1 = require("antd");
var Panel = antd_1.Collapse.Panel;
require("antd/dist/antd.css");
var decorator = function (axios) { return addons_2.makeDecorator({
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: function (storyFn, context, data) {
        var emit = addons_1.useChannel({});
        data.parameters.interceptors.response.use(function (response) {
            emit('axios-request', response);
            return response;
        });
        return storyFn(context);
    },
}); };
exports.decorator = decorator;
exports.default = exports.decorator;
var Content = function (_a) {
    var list = _a.list;
    // @ts-ignore
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Collapse, null, list.map(function (request, idx) {
            var title = request.config.method.toUpperCase() + " " + request.config.url;
            return (react_1.default.createElement(Panel, { header: title, key: idx },
                react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Headers"),
                JSON.stringify(request.config.headers),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Data"),
                JSON.stringify(request.config.headers),
                react_1.default.createElement(antd_1.Divider, { orientation: "left", plain: true }, "Stuff"),
                JSON.stringify(request.config.headers)));
        }))));
};
addons_1.addons.register('faebeee/storybook-axios', function (api) {
    addons_1.addons.add('storybook-axios/panel', {
        title: 'Axios',
        type: addons_1.types.PANEL,
        render: function (_a) {
            var active = _a.active, key = _a.key;
            var _b = react_1.useState([]), requests = _b[0], setRequests = _b[1];
            addons_1.addons.getChannel().addListener('axios-request', function (data) {
                setRequests(__spreadArrays(requests, [data]));
            });
            // @ts-ignore
            return (react_1.default.createElement(components_1.AddonPanel, { active: active, key: key }, requests.length === 0 ? react_1.default.createElement(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }) : react_1.default.createElement(Content, { list: requests })));
        },
    });
});
