"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("./book.model"));
const category_model_1 = __importDefault(require("./category.model"));
exports.default = {
    Book: book_model_1.default, Category: category_model_1.default
};
