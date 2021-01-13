"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorator = void 0;
var addons_1 = require("@storybook/addons");
var react_1 = require("react");
var decorator = function (axios) { return addons_1.makeDecorator({
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: function (storyFn, context, data) {
        var emit = addons_1.useChannel({});
        var onReq = function (request) {
            emit('axios-request', request);
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
