"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDS = void 0;
var react_1 = __importDefault(require("react"));
var manager_api_1 = require("@storybook/manager-api");
var Addon_1 = require("./src/components/Addon");
var IDS;
(function (IDS) {
    IDS["ADDON"] = "faebeee/storybook-axios";
    IDS["PANEL"] = "storybook-axios/panel";
})(IDS = exports.IDS || (exports.IDS = {}));
manager_api_1.addons.register(IDS.ADDON, function () {
    manager_api_1.addons.add(IDS.PANEL, {
        title: "Axios",
        type: manager_api_1.types.PANEL,
        render: function (_a) {
            var active = _a.active, key = _a.key;
            return (react_1.default.createElement(Addon_1.Addon, { active: active, key: key }));
        },
    });
});
