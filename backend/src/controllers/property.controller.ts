import { NextFunction, Request, Response } from "express";
import { PropertyModel } from "../models/property.model";

export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allProperties = await PropertyModel.find();

    return res.json({
      success: true,
      data: {
        properties: allProperties,
      },
    });
  } catch (error) {
    next(error);
  }
};
