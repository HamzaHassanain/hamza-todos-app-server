"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.put("/update", verifyToken_1.requireAuth, user_controller_1.updateUserController);
router.delete("/delete", verifyToken_1.requireAuth, user_controller_1.deleteUserController);
exports.default = router;
//# sourceMappingURL=user.route.js.map