"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Debug_1 = __importDefault(require("../utils/Debug"));
exports.default = (err, req, res, next) => {
    Debug_1.default.error(err);
    res.status(err.code || 500).json(Object.assign({}, err));
};
//# sourceMappingURL=ErrorHandler.js.map