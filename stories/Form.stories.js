"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Get = exports.Post = void 0;
const react_1 = __importDefault(require("react"));
const Form_1 = require("./Form");
exports.default = {
    title: 'Form',
    component: Form_1.Form,
    args: {
        url: 'https://d9ef6d5321d6e4acd1de452ad45a8d86.m.pipedream.net',
    },
};
const Post = (args) => react_1.default.createElement(Form_1.Form, Object.assign({ method: "post" }, args));
exports.Post = Post;
const Get = (args) => react_1.default.createElement(Form_1.Form, Object.assign({ method: "get" }, args));
exports.Get = Get;
const Put = (args) => react_1.default.createElement(Form_1.Form, Object.assign({ method: "put" }, args));
exports.Put = Put;
const Delete = (args) => react_1.default.createElement(Form_1.Form, Object.assign({ method: "delete" }, args));
exports.Delete = Delete;
