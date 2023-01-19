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
exports.deleteUserController = exports.updateUserController = void 0;
const Debug_1 = __importDefault(require("../utils/Debug"));
const user_model_1 = __importDefault(require("../models/user.model"));
const successResponse_1 = require("../utils/successResponse");
const errorHandlers_1 = require("../utils/errorHandlers");
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const [type, token] = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ");
    Debug_1.default.info(type, token);
    try {
        if (name && name.length >= 6) {
            const user = yield user_model_1.default.findOne({ email: req.user.email });
            if (!user)
                throw new errorHandlers_1.AuthError("User Does Not Exist ");
            user.name = name;
            yield user.save();
            req.user.name = name;
            const response = new successResponse_1.SuccessResponse({ user: Object.assign(Object.assign({}, req.user), { token }) });
            res.json(response);
        }
        else
            throw new errorHandlers_1.AuthError("Cannot update name!", {
                name: "The name you entered is invalid, name must be minimum of 6 characters",
            });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findOneAndDelete({ email: req.user.email });
        const response = new successResponse_1.SuccessResponse({}, 200, `User with email  ${req.user.email} deleted`);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=user.controller.js.map