import { Router } from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller";
import {
  validateLoginData,
  validateSignupData,
} from "../middlewares/validateAuthData";
const router = Router();

router.post("/signup", validateSignupData, signupController);
router.post("/login", validateLoginData, loginController);

export default router;
