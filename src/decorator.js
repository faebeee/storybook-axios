"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStorybookAxios = void 0;
const addons_1 = require("@storybook/addons");
const serialize_form_data_1 = __importDefault(require("./utils/serialize-form-data"));
const withStorybookAxios = (axios) => {
    const interceptors = { req: null, res: null };
    return (0, addons_1.makeDecorator)({
        name: 'withAxios',
        parameterName: 'axios',
        wrapper: (storyFn, context) => {
            const emit = (0, addons_1.useChannel)({});
            if (interceptors.req !== null) {
                axios.interceptors.request.eject(interceptors.req);
                interceptors.req = null;
            }
            if (interceptors.res !== null) {
                axios.interceptors.response.eject(interceptors.res);
                interceptors.res = null;
            }
            const onReq = (request) => {
                const data = request.data instanceof FormData
                    ? (0, serialize_form_data_1.default)(request.data)
                    : request.data;
                emit('axios-request', Object.assign(Object.assign({}, request), { data }));
                return request;
            };
            const onRes = (response) => {
                emit('axios-response', response);
                return response;
            };
            const onResFailed = (error) => {
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
