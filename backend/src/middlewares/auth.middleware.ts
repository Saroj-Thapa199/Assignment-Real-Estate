import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware";
import { verifyToken } from "../utils/tokens";
import { UserModel } from "../models/user.model";

export const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new AppError("No token provided", 401);
    }

    const payload = verifyToken(token);

    const user = await UserModel.findById(payload.userId);
    if (!user) throw new AppError("User not found", 404);

    req.userId = user._id.toString();
    next();
  } catch (error) {
    next(error);
  }
};
