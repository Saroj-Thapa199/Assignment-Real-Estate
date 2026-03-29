import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/error.middleware";
import { UserModel } from "../models/user.model";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateToken } from "../utils/tokens";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log({ body: req.body });
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      throw new AppError("All the fields are required", 400);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }

    if (password.length < 8 || password.length > 32) {
      throw new AppError(
        "Password must be length greater than 8 and less than 32",
        400,
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id.toString());

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      //   sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Please fill all credentials", 400);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError("Invalid credentials!", 401);
    }

    const isPasswordMatch = await verifyPassword(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid credentials!", 401);
    }

    const token = generateToken(user._id.toString());

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {}
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};
