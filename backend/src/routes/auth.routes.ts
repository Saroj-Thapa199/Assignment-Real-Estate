import express from "express";
import {
  getProfile,
  login,
  logout,
  registerUser,
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/auth.middleware";
import { authLimiter } from "../middlewares/rateLimitter.middleware";

const authRouter = express.Router();

authRouter.post("/register", authLimiter, registerUser);
authRouter.post("/login", authLimiter, login);
authRouter.post("/logout", logout);
authRouter.get("/me", validateRequest, getProfile);

export default authRouter;
