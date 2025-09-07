import { Router } from "express";
import { ValidateMiddleware } from "../middlewares/validate.middleware";
import { userLogin, userRegister } from "../controllers/authController";
import {
  loginValidation,
  registerValidator,
} from "../validators/authValidator";

const router = Router();

router.post("/register", ValidateMiddleware(registerValidator), userRegister);
router.post("/login", ValidateMiddleware(loginValidation), userLogin);

export default router;
