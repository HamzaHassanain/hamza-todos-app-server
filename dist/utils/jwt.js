"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.maxAge = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const consts_1 = require("./consts");
dotenv_1.default.config();
exports.maxAge = consts_1.TOKEN_MAX_AGE;
const createToken = (data) => {
    const secret = process.env.TOEKN_SECRET;
    if (!secret)
        throw new Error("No TOEKN_SECRET was provided");
    return jsonwebtoken_1.default.sign({ data }, secret, {
        expiresIn: exports.maxAge,
    });
};
exports.createToken = createToken;
//# sourceMappingURL=jwt.js.map