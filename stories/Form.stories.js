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
exports.Delete = exports.Put = exports.Get = exports.Post = void 0;
var react_1 = __importDefault(require("react"));
var Form_1 = require("./Form");
exports.default = {
    title: 'Form',
    component: Form_1.Form,
    args: {
        url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net',
    },
};
var Post = function (args) { return react_1.default.createElement(Form_1.Form, __assign({ method: "post" }, args)); };
exports.Post = Post;
var Get = function (args) { return react_1.default.createElement(Form_1.Form, __assign({ method: "get" }, args)); };
exports.Get = Get;
var Put = function (args) { return react_1.default.createElement(Form_1.Form, __assign({ method: "put" }, args)); };
exports.Put = Put;
var Delete = function (args) { return react_1.default.createElement(Form_1.Form, __assign({ method: "delete" }, args)); };
exports.Delete = Delete;
