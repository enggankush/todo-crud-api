import { Router } from "express";
import { updatedValidation } from "../validators/authValidator";
import { getUser, userDelete, userUpdate } from "../controllers/userController";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidateMiddleware } from "../middlewares/validate.middleware";

const router = Router();
router.use(AuthMiddleware);

router.get("/", getUser);
router.patch("/", ValidateMiddleware(updatedValidation), userUpdate);
router.delete("/", userDelete);

export default router;
