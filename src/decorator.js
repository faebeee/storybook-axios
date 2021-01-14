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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorator = void 0;
var addons_1 = require("@storybook/addons");
var react_1 = require("react");
var serialize_form_data_1 = __importDefault(require("./utils/serialize-form-data"));
var decorator = function (axios) { return addons_1.makeDecorator({
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: function (storyFn, context, data) {
        var emit = addons_1.useChannel({});
        var onReq = function (request) {
            var data = request.data instanceof FormData ? serialize_form_data_1.default(request.data) : request.data;
            emit('axios-request', __assign(__assign({}, request), { data: data }));
            return request;
        };
        var onRes = function (response) {
            emit('axios-response', response);
            return response;
        };
        react_1.useEffect(function () {
            var reqInt = axios.interceptors.request.use(onReq);
            var resInt = axios.interceptors.response.use(onRes);
            return function () {
                axios.interceptors.request.eject(reqInt);
                axios.interceptors.response.eject(resInt);
            };
        });
        return storyFn(context);
    },
}); };
exports.decorator = decorator;
