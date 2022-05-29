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
exports.getUploadedFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errors_1 = require("../utils/errors");
const getUploadedFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename } = req.params;
        const filePath = path_1.default.join(__dirname, '../uploads', filename);
        const isExist = fs_1.default.existsSync(filePath);
        if (!isExist)
            return (0, errors_1.notFound)(`File '${filename}' not found`, res);
        console.log(req.query);
        if (req.query.stream !== undefined) {
            console.log("Stream mode");
            res.setHeader('Content-Type', 'application/octet-stream');
            return fs_1.default.createReadStream(filePath).pipe(res);
        }
        res.sendFile(filePath);
    }
    catch (err) {
        (0, errors_1.serverError)(err, res);
    }
});
exports.getUploadedFile = getUploadedFile;
