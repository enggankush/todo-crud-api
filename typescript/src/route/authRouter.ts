import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/authController";
import {
  loginValidation,
  registerValidator,
  updatedValidation,
} from "../validators/authValidator";

const router = Router();

router.post("/register", validate(registerValidator), userRegister);
router.post("/login", validate(loginValidation), userLogin);
router.patch("/update/:id", validate(updatedValidation), userUpdate);
router.delete("/delete/:id", userDelete);

export default router;
