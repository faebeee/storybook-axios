"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorator = void 0;
var addons_1 = require("@storybook/addons");
var decorator = function (axios) { return addons_1.makeDecorator({
    name: 'withAxios',
    parameterName: 'axios',
    wrapper: function (storyFn, context, data) {
        var emit = addons_1.useChannel({});
        axios.interceptors.request.use(function (request) {
            emit('axios-request', request);
            return request;
        });
        axios.interceptors.response.use(function (response) {
            emit('axios-response', response);
            return response;
        });
        return storyFn(context);
    },
}); };
exports.decorator = decorator;
