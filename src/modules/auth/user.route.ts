import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export const authRouter = router;
