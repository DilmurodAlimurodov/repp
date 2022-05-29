"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.alreadyExist = exports.serverError = void 0;
const serverError = (err, res) => {
    res.status(500).json({
        msg: err.message || 'Internal Server Error',
        details: err
    });
};
exports.serverError = serverError;
const alreadyExist = (msg, res) => {
    res.status(400).json({
        msg: msg,
        details: []
    });
};
exports.alreadyExist = alreadyExist;
const notFound = (msg, res) => {
    res.status(404).json({
        msg: msg,
        details: []
    });
};
exports.notFound = notFound;
