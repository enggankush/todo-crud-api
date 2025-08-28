import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  sendVerificationCode,
} from "../controllers/userController.js";
import {
  loginValidator,
  registerValidator,
  updateValidator,
} from "../validators/authValidator.js";

const router = Router();

router.post("/register", validate(registerValidator), userRegister);
router.post("/login", validate(loginValidator), userLogin);
router.put("/update/:id", validate(updateValidator), userUpdate);
router.delete("/delete/:id", userDelete);
router.patch("/reset-password", sendVerificationCode);

export default router;
