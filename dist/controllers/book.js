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
exports.fetchBooks = exports.getBook = exports.fetchCategoryBooks = exports.fetchAll = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const errors_1 = require("../utils/errors");
const fetchAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.findAll();
        res.json(categories);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.fetchAll = fetchAll;
const fetchCategoryBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slugUrl } = req.params;
        const category = yield category_model_1.default.findOne({
            where: { slugUrl }
        });
        if (!category)
            return (0, errors_1.notFound)(`Book category '${slugUrl}' not found!`, res);
        const categoryBooks = yield book_model_1.default.findAndCountAll({
            where: {
                categoryId: category.id
            }
        });
        res.json({
            category,
            totalBooks: categoryBooks.count,
            books: categoryBooks.rows
        });
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.fetchCategoryBooks = fetchCategoryBooks;
// Books
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, slugUrl } = req.params;
        const bookCategory = yield category_model_1.default.findOne({
            where: {
                slugUrl: category
            }
        });
        if (!bookCategory)
            return (0, errors_1.notFound)(`Book category '${category}' not found!`, res);
        const book = yield book_model_1.default.findOne({
            where: {
                slugUrl: slugUrl,
                categoryId: bookCategory.id
            }
        });
        if (!book)
            return (0, errors_1.notFound)(`Book '${slugUrl}' not found!`, res);
        res.json(book);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.getBook = getBook;
const fetchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, start, end } = req.params;
        const bookCategory = yield category_model_1.default.findOne({
            where: {
                slugUrl: category
            }
        });
        if (!bookCategory)
            return (0, errors_1.notFound)(`Book category '${category}' not found!`, res);
        const books = yield book_model_1.default.findAll({
            where: {
                categoryId: bookCategory.id
            },
            offset: +start,
            limit: +end
        });
        res.json(books);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.fetchBooks = fetchBooks;
