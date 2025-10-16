"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
const react_1 = __importDefault(require("react"));
const Page_1 = require("./Page");
exports.default = {
    title: 'Ajax',
    component: Page_1.Page,
    args: {
        url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net',
    },
};
const Get = (args) => react_1.default.createElement(Page_1.Page, Object.assign({ method: "get", config: null }, args));
exports.Get = Get;
const Post = (args) => react_1.default.createElement(Page_1.Page, Object.assign({ method: "post", config: { foo: 'bar' } }, args));
exports.Post = Post;
const Put = (args) => react_1.default.createElement(Page_1.Page, Object.assign({ method: "put", config: { foo: 'bar' } }, args));
exports.Put = Put;
const Patch = (args) => react_1.default.createElement(Page_1.Page, Object.assign({ method: "patch", config: { foo: 'bar' } }, args));
exports.Patch = Patch;
const Delete = (args) => (react_1.default.createElement(Page_1.Page, Object.assign({ method: "delete", config: { params: { foo: 'bar' } } }, args)));
exports.Delete = Delete;
