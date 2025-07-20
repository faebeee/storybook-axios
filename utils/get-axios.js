"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxios = void 0;
var axios_1 = __importDefault(require("axios"));
var instance = axios_1.default.create();
var getAxios = function () { return instance; };
exports.getAxios = getAxios;
