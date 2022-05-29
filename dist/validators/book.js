"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExist = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const slugify_1 = __importDefault(require("../utils/slugify"));
const isExist = (title, category) => __awaiter(void 0, void 0, void 0, function* () {
    const sluged = (0, slugify_1.default)(title);
    const bookCategory = yield category_model_1.default.findOne({
        where: {
            slugUrl: category
        }
    });
    if (!bookCategory)
        return Promise.resolve({
            err: true,
            msg: `Book category '${category}' not found!`
        });
    const book = yield book_model_1.default.findOne({
        where: {
            slugUrl: (0, slugify_1.default)(title),
            categoryId: bookCategory.id
        }
    });
    if (!book)
        return Promise.resolve({
            err: false,
            ok: false,
            categoryId: bookCategory.id
        });
    return Promise.resolve({
        err: false,
        ok: true,
        categoryId: bookCategory.id
    });
});
exports.isExist = isExist;
