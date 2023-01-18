"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateAuthData_1 = require("../middlewares/validateAuthData");
const router = (0, express_1.Router)();
router.post("/signup", validateAuthData_1.validateSignupData, auth_controller_1.signupController);
router.post("/login", validateAuthData_1.validateLoginData, auth_controller_1.loginController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map