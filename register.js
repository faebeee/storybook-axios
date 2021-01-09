"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = require("./src/decorator");
var addon_1 = __importDefault(require("./src/addon"));
exports.default = decorator_1.decorator;
addon_1.default();
