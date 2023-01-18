import { Router } from "express";
import {
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";
import { requireAuth } from "../middlewares/verifyToken";
import todosSubRouter from "./todos.router";
const router = Router();

router.put("/update", requireAuth, updateUserController);
router.delete("/delete", requireAuth, deleteUserController);

router.use("/todos/", todosSubRouter);
export default router;
