import { Router } from "express";
import {
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";
import { requireAuth } from "../middlewares/verifyToken";
const router = Router();

router.put("/update", requireAuth, updateUserController);
router.delete("/delete", requireAuth, deleteUserController);
export default router;
