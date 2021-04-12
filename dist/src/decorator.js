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
var types_1 = require("./types");
var serialize_form_data_1 = __importDefault(require("./utils/serialize-form-data"));
var withStorybookAxios = function (axios) {
    var interceptors = { req: null, res: null, responseOverwrite: { code: null, response: null } };
    return addons_1.makeDecorator({
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: function (storyFn, context, data) {
            var _a;
            var emit = addons_1.useChannel((_a = {},
                _a[types_1.EVENTS.UPDATE_RESPONSE_OVERWRITE] = function (settings) {
                    // Reset
                    !settings && (interceptors.responseOverwrite = { code: null, response: null });
                    // update values
                    !!(settings === null || settings === void 0 ? void 0 : settings.code) && (interceptors.responseOverwrite.code = parseInt(settings.code));
                    !!(settings === null || settings === void 0 ? void 0 : settings.response) && (interceptors.responseOverwrite.response = settings.response);
                },
                _a));
            if (interceptors.req !== null) {
                axios.interceptors.request.eject(interceptors.req);
                interceptors.req = null;
            }
            if (interceptors.res !== null) {
                axios.interceptors.response.eject(interceptors.res);
                interceptors.res = null;
            }
            var onReq = function (request) {
                var data = request.data instanceof FormData ? serialize_form_data_1.default(request.data) : request.data;
                if (interceptors.responseOverwrite.code) {
                }
                emit(types_1.EVENTS.REQUEST, __assign(__assign({}, request), { data: data }));
                return request;
            };
            var mutateResponse = function (response) {
                if (interceptors.responseOverwrite.code) {
                    response.status = interceptors.responseOverwrite.code;
                }
                if (interceptors.responseOverwrite.response) {
                    response.data = JSON.parse(interceptors.responseOverwrite.response);
                }
            };
            var onRes = function (response) {
                mutateResponse(response);
                emit(types_1.EVENTS.RESPONSE, response);
                return response;
            };
            var onResFailed = function (error) {
                if (error.isAxiosError === true) {
                    mutateResponse(error.response);
                    emit(types_1.EVENTS.RESPONSE_ERROR, error);
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
