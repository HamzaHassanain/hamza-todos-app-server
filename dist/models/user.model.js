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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Debug_1 = __importDefault(require("../utils/Debug"));
const TodosSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
});
const UserSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
    },
    encrypted_password: {
        required: true,
        type: String,
    },
    todos: [TodosSchema],
});
UserSchema.method("compare", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const valid = yield bcrypt_1.default.compare(password, this.encrypted_password);
            Debug_1.default.log(valid, this.encrypted_password, password);
            return valid;
        }
        catch (error) {
            Debug_1.default.error("Error at compare function", error);
            return false;
        }
    });
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map