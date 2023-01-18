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
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandlers_1 = require("../utils/errorHandlers");
const Debug_1 = __importDefault(require("../utils/Debug"));
// const User = require("../models/User")
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [type, token] = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ");
    Debug_1.default.success(req.headers.authorization);
    try {
        if (!token)
            throw new errorHandlers_1.AuthError("No Token Was Provided");
        if (type === "Bearer") {
            const secret = process.env.TOEKN_SECRET;
            if (!secret)
                throw new Error("No TOEKN_SECRET was provided");
            const result = yield jsonwebtoken_1.default.verify(token, secret);
            if (typeof result === "string")
                throw new errorHandlers_1.ServerError("Some error with token as it is of type string");
            req.user = result["data"];
            // console.log(result)
            next();
        }
        else
            throw new errorHandlers_1.AuthError("Invalid token: Token not bearer");
    }
    catch (error) {
        next(error);
    }
});
exports.requireAuth = requireAuth;
// check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt
//   if (token) {
//     jwt.verify(token, "net ninja secret", async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null
//         next()
//       } else {
//         let user = await User.findById(decodedToken.id)
//         res.locals.user = user
//         next()
//       }
//     })
//   } else {
//     res.locals.user = null
//     next()
//   }
// }
//# sourceMappingURL=verifyToken.js.map