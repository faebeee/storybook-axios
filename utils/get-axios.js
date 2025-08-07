"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create();
const getAxios = () => instance;
exports.getAxios = getAxios;
