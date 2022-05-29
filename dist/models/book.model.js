"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const category_model_1 = __importDefault(require("./category.model"));
let Book = class Book extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Max)(20),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Max)(40),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "slugUrl", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Max)(30),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        defaultValue: false
    }),
    __metadata("design:type", Boolean)
], Book.prototype, "discount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "discountPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Book.prototype, "img", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.default),
    __metadata("design:type", category_model_1.default)
], Book.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_model_1.default),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Book.prototype, "categoryId", void 0);
Book = __decorate([
    sequelize_typescript_1.Table
], Book);
exports.default = Book;
