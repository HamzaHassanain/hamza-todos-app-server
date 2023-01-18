import { Router } from "express";
import {
  getTodos,
  addNewTodo,
  updateTodo,
  deleteTodo,
  deleteDoneTodo,
} from "../controllers/todos.controller";
import { requireAuth } from "../middlewares/verifyToken";
const router = Router();
router.get("/", requireAuth, getTodos);
router.post("/new", requireAuth, addNewTodo);
router.put("/toggle/:id", requireAuth, updateTodo);
router.delete("/delete/:id", requireAuth, deleteTodo);
router.delete("/delete-done", requireAuth, deleteDoneTodo);

export default router;
