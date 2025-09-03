import { Router } from "express";
import { userRegister } from "../controllers/authController";

const router = Router();

router.post("/register", userRegister);

export default router;
