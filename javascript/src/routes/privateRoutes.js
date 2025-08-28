import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  createTodo,
  todoDelete,
  todoUpdate,
} from "../controllers/todoController.js";
import {
  createTodoValidator,
  updateTodoValidator,
} from "../validators/todoValidator.js";

const router = Router();

router.post("/todos", validate(createTodoValidator), createTodo);
router.put("/todos/update/:id", validate(updateTodoValidator), todoUpdate);
router.delete("/todos/delete/:id", todoDelete);

export default router;
