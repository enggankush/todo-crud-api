import { Router } from "express";
import { validate } from "../middlewares/validate";
import { userLogin, userRegister } from "../controllers/authController";
import {
  loginValidation,
  registerValidator,
} from "../validators/authValidator";

const router = Router();

router.post("/register", validate(registerValidator), userRegister);
router.post("/login", validate(loginValidation), userLogin);

export default router;
