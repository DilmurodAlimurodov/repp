"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
exports.default = (text) => {
    return (0, slugify_1.default)(text, {
        replacement: '-',
        remove: /[*+~.()'"!:@%^&?]/g,
        lower: true,
        strict: true,
        locale: 'vi',
        trim: true
    });
};
