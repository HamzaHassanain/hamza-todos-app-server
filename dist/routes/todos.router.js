"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.get("/", verifyToken_1.requireAuth, todos_controller_1.getTodos);
router.post("/new", verifyToken_1.requireAuth, todos_controller_1.addNewTodo);
router.put("/toggle/:id", verifyToken_1.requireAuth, todos_controller_1.updateTodo);
router.delete("/delete/:id", verifyToken_1.requireAuth, todos_controller_1.deleteTodo);
router.delete("/delete-done", verifyToken_1.requireAuth, todos_controller_1.deleteDoneTodo);
exports.default = router;
//# sourceMappingURL=todos.router.js.map