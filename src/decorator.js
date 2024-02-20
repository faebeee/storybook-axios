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
exports.withStorybookAxios = void 0;
var addons_1 = require("@storybook/addons");
var serialize_form_data_1 = __importDefault(require("./utils/serialize-form-data"));
var withStorybookAxios = function (axios) {
    var interceptors = { req: null, res: null };
    return (0, addons_1.makeDecorator)({
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: function (storyFn, context, data) {
            var emit = (0, addons_1.useChannel)({});
            if (interceptors.req !== null) {
                axios.interceptors.request.eject(interceptors.req);
                interceptors.req = null;
            }
            if (interceptors.res !== null) {
                axios.interceptors.response.eject(interceptors.res);
                interceptors.res = null;
            }
            var onReq = function (request) {
                var data = request.data instanceof FormData ? (0, serialize_form_data_1.default)(request.data) : request.data;
                emit('axios-request', __assign(__assign({}, request), { data: data }));
                return request;
            };
            var onRes = function (response) {
                emit('axios-response', response);
                return response;
            };
            var onResFailed = function (error) {
                if (error.isAxiosError === true) {
                    emit('axios-response-error', error);
                }
                return Promise.reject(error);
            };
            interceptors.req = axios.interceptors.request.use(onReq);
            interceptors.res = axios.interceptors.response.use(onRes, onResFailed);
            return storyFn(context);
        },
    });
};
exports.withStorybookAxios = withStorybookAxios;
exports.default = exports.withStorybookAxios;
