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
exports.loginController = exports.signupController = void 0;
const jwt_1 = require("../utils/jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
const successResponse_1 = require("../utils/successResponse");
const errorHandlers_1 = require("../utils/errorHandlers");
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prevUser = yield user_model_1.default.findOne({
            email: req.user_create_data.email,
        });
        if (prevUser)
            throw new errorHandlers_1.AuthError("Already exsist error", { email: "Email is used" });
        const userData = req.user_create_data;
        yield user_model_1.default.create(userData);
        delete userData.encrypted_password;
        const user = Object.assign({}, userData);
        const token = (0, jwt_1.createToken)(user);
        const response = new successResponse_1.SuccessResponse({ user: Object.assign(Object.assign({}, user), { token }) });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.signupController = signupController;
const errors = [
    "Invalid Login user or password not match",
    {
        email: "Email not possibly not exsist",
        password: "Password not possibly not exsist",
    },
];
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.uesr_login_data;
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            throw new errorHandlers_1.AuthError(...errors);
        const valid = yield user.compare(password);
        if (!valid)
            throw new errorHandlers_1.AuthError(...errors);
        const token = (0, jwt_1.createToken)({ email: user.email, name: user.name });
        const response = new successResponse_1.SuccessResponse({
            user: { email: user.email, name: user.name, token },
        });
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.loginController = loginController;
//# sourceMappingURL=auth.controller.js.map