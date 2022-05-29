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
exports.deleteBook = exports.updateBook = exports.createBook = exports.deleteBookCategory = exports.updateBookCategory = exports.createBookCategory = void 0;
const errors_1 = require("../../utils/errors");
const category_model_1 = __importDefault(require("../../models/category.model"));
const book_model_1 = __importDefault(require("../../models/book.model"));
const slugify_1 = __importDefault(require("../../utils/slugify"));
const uploads_1 = require("../../utils/uploads");
const multer_1 = __importDefault(require("../../utils/multer"));
// Book category
const createBookCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const sluged = (0, slugify_1.default)(title);
        const isExist = yield category_model_1.default.findOne({
            where: {
                slugUrl: sluged
            }
        });
        if (isExist)
            return (0, errors_1.alreadyExist)(`Book category '${sluged}' is exist!`, res);
        const newBookCategory = yield category_model_1.default.create({
            title: title.trim(),
            slugUrl: sluged
        });
        res.status(201).json(newBookCategory);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.createBookCategory = createBookCategory;
const updateBookCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slugUrl } = req.params;
        const { title } = req.body;
        const category = yield category_model_1.default.findOne({
            where: {
                slugUrl: slugUrl
            }
        });
        if (!category)
            return (0, errors_1.notFound)(`Book category '${slugUrl}' not found!`, res);
        const sluged = (0, slugify_1.default)(title);
        const isExist = yield category_model_1.default.findOne({
            where: {
                slugUrl: sluged
            }
        });
        if (isExist && isExist.slugUrl !== sluged)
            return (0, errors_1.alreadyExist)(`Book category '${sluged}' is exist!`, res);
        category.title = title.trim();
        category.slugUrl = sluged;
        const saved = yield category.save();
        res.json(saved);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.updateBookCategory = updateBookCategory;
const deleteBookCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slugUrl } = req.params;
        const category = yield category_model_1.default.findOne({
            where: {
                slugUrl: slugUrl
            }
        });
        if (!category)
            return (0, errors_1.notFound)(`Book category '${slugUrl}' not found!`, res);
        yield category.destroy();
        res.json({ ok: true, msg: `Book category '${slugUrl}' deleted!` });
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.deleteBookCategory = deleteBookCategory;
// Books
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = multer_1.default.single('img');
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return (0, errors_1.serverError)(err, res);
        try {
            const { title, category, price, author } = req.body;
            const file = req.file;
            const sluged = (0, slugify_1.default)(title);
            const bookCategory = yield category_model_1.default.findOne({
                where: {
                    slugUrl: category
                }
            });
            if (!bookCategory) {
                (0, uploads_1.remove)(file.filename);
                return (0, errors_1.notFound)(`Book category '${category}' not found!`, res);
            }
            const book = yield book_model_1.default.findOne({
                where: {
                    slugUrl: (0, slugify_1.default)(title),
                    categoryId: bookCategory.id
                }
            });
            if (book) {
                (0, uploads_1.remove)(file.filename);
                return (0, errors_1.alreadyExist)(`Book '${sluged}' is already exist!`, res);
            }
            const newBook = yield book_model_1.default.create({
                title: title.trim(),
                slugUrl: (0, slugify_1.default)(title),
                author: author,
                price: price,
                categoryId: bookCategory.id,
                img: req.file.filename
            });
            res.status(201).json(newBook);
        }
        catch (err) {
            (0, errors_1.serverError)(err, res);
        }
    }));
});
exports.createBook = createBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upload = multer_1.default.single('img');
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return (0, errors_1.serverError)(err, res);
        }
        try {
            const { title, price, author, discount, discountPrice, categorySlug } = req.body;
            const { category, slugUrl } = req.params;
            const file = req.file;
            const bookCategory = yield category_model_1.default.findOne({
                where: {
                    slugUrl: category
                }
            });
            if (!bookCategory) {
                if (req.file)
                    (0, uploads_1.remove)(file.filename);
                return (0, errors_1.notFound)(`Book category '${category}' not found!`, res);
            }
            const book = yield book_model_1.default.findOne({
                where: {
                    slugUrl: slugUrl,
                    categoryId: bookCategory.id
                }
            });
            if (!book) {
                if (req.file)
                    (0, uploads_1.remove)(file.filename);
                return (0, errors_1.notFound)(`Book '${slugUrl}' not found!`, res);
            }
            let newCategoryId;
            if (categorySlug) {
                const isCategory = yield category_model_1.default.findOne({
                    where: {
                        slugUrl: categorySlug
                    }
                });
                if (!isCategory) {
                    if (req.file)
                        (0, uploads_1.remove)(file.filename);
                    return (0, errors_1.notFound)(`Book category '${categorySlug}' is not exist!`, res);
                }
                book.categoryId = isCategory.id;
                newCategoryId = isCategory.id;
            }
            if (title) {
                const sluged = (0, slugify_1.default)(title);
                const isBook = yield book_model_1.default.findOne({
                    where: {
                        slugUrl: sluged,
                        categoryId: newCategoryId || bookCategory.id
                    }
                });
                if (isBook && isBook.slugUrl !== sluged) {
                    if (req.file)
                        (0, uploads_1.remove)(file.filename);
                    return (0, errors_1.alreadyExist)(`Book category '${sluged}' is exist! Please choose another title.`, res);
                }
                book.title = title.trim();
                book.slugUrl = sluged;
            }
            if (file) {
                (0, uploads_1.remove)(book.img);
                book.img = file.filename;
            }
            if (author)
                book.author = author;
            if (price)
                book.price = price;
            if (discount)
                book.discount = discount;
            if (discountPrice)
                book.discountPrice = discountPrice;
            const saved = yield book.save();
            res.json(saved);
        }
        catch (err) {
            (0, errors_1.serverError)(err, res);
        }
    }));
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        (0, uploads_1.remove)(book.img);
        yield book.destroy();
        res.json({ ok: true, msg: `Book '${slugUrl}' deleted!` });
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.deleteBook = deleteBook;
