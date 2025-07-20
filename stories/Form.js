"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
var serialize_form_data_1 = __importDefault(require("../src/utils/serialize-form-data"));
var get_axios_1 = require("../utils/get-axios");
var antd_2 = require("antd");
var Form = function (_a) {
    var url = _a.url, method = _a.method;
    var form = (0, react_1.useRef)(null);
    console.log(method);
    var execRequest = function (e) {
        e.preventDefault();
        if (!form.current) {
            return;
        }
        var formData = new FormData(form.current);
        if (['get', 'delete'].includes(method)) {
            (0, get_axios_1.getAxios)()[method](url, { params: (0, serialize_form_data_1.default)(formData) });
        }
        else {
            (0, get_axios_1.getAxios)()[method](url, formData);
        }
    };
    return (react_2.default.createElement("form", { ref: form, action: url, method: method, onSubmit: execRequest },
        react_2.default.createElement(antd_2.Input, { value: "Hello World", name: "value" }),
        react_2.default.createElement(antd_1.Button, { htmlType: "submit", type: "primary" }, "Submit")));
};
exports.Form = Form;
