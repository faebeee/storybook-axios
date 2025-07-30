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
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
var react_1 = __importDefault(require("react"));
var Page_1 = require("./Page");
exports.default = {
    title: 'Ajax',
    component: Page_1.Page,
    argTypes: {
        url: { defaultValue: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net' }
    }
};
var Get = function (args) { return react_1.default.createElement(Page_1.Page, __assign({ method: "get", config: null }, args)); };
exports.Get = Get;
var Post = function (args) { return react_1.default.createElement(Page_1.Page, __assign({ method: "post", config: { foo: 'bar' } }, args)); };
exports.Post = Post;
var Put = function (args) { return react_1.default.createElement(Page_1.Page, __assign({ method: "put", config: { foo: 'bar' } }, args)); };
exports.Put = Put;
var Patch = function (args) { return react_1.default.createElement(Page_1.Page, __assign({ method: "patch", config: { foo: 'bar' } }, args)); };
exports.Patch = Patch;
var Delete = function (args) { return react_1.default.createElement(Page_1.Page, __assign({ method: "delete", config: { params: { foo: 'bar' } } }, args)); };
exports.Delete = Delete;
