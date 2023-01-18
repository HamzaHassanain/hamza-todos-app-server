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
exports.validateLoginData = exports.validateSignupData = void 0;
const validator_1 = __importDefault(require("validator"));
const errorHandlers_1 = require("../utils/errorHandlers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Debug_1 = __importDefault(require("../utils/Debug"));
function validateSignupData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name, password } = req.body;
        Debug_1.default.info(req.body);
        try {
            const errors = buildErrors(email, name, password);
            if (errors.email || errors.name || errors.password)
                throw new errorHandlers_1.AuthError("", errors);
            const salt = yield bcrypt_1.default.genSalt();
            const encrypted_password = yield bcrypt_1.default.hash(password, salt);
            const user_create_data = {
                encrypted_password,
                email,
                name,
            };
            req.user_create_data = user_create_data;
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.validateSignupData = validateSignupData;
function validateLoginData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const errors = buildErrors(email, "", password);
            if (errors.email || errors.password)
                throw new errorHandlers_1.AuthError("", errors);
            req.uesr_login_data = { email, password };
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.validateLoginData = validateLoginData;
function buildErrors(email, name, password) {
    const errors = {};
    if (!validator_1.default.isEmail(email || ""))
        errors.email = "The email you entered is invalid or no email";
    if (!password || password.length < 6)
        errors.password =
            "The password you entered is invalid , password must be minimum of 6 characters";
    if (!name || name.length < 6)
        errors.name =
            "The name you entered is invalid, name must be minimum of 6 characters";
    return errors;
}
//# sourceMappingURL=validateAuthData.js.map