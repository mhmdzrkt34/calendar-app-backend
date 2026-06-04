import express from "express";
import { Login, SendOtp } from "../controllers/AuthController.js";
import { validateLogin, validateOtp, verifyLogin } from "../validations/authValidation.js";
const router = express.Router();
router.post("/login", validateLogin, verifyLogin, Login);
router.post("/otp", validateOtp, SendOtp);
export default router;