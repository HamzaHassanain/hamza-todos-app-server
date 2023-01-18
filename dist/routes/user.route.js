"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const todos_router_1 = __importDefault(require("./todos.router"));
const router = (0, express_1.Router)();
router.put("/update", verifyToken_1.requireAuth, user_controller_1.updateUserController);
router.delete("/delete", verifyToken_1.requireAuth, user_controller_1.deleteUserController);
router.use("/todos/", todos_router_1.default);
exports.default = router;
//# sourceMappingURL=user.route.js.map