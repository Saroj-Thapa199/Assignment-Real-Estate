import { NextFunction, Request, Response } from "express";
import { FavouriteModel } from "../models/favourites.model";
import { AppError } from "../middlewares/error.middleware";
import { PropertyModel } from "../models/property.model";
import { isValidObjectId } from "mongoose";

export const addToFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyId } = req.params;
    const userId = req.userId!;

    if (typeof propertyId !== "string" || !isValidObjectId(propertyId)) {
      throw new AppError("Invalid propertyId", 400);
    }

    const property = await PropertyModel.findById(propertyId);
    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const favouriteProperty = await FavouriteModel.create({
      userId,
      propertyId,
    });

    return res.status(201).json({
      success: true,
      message: "Added to favourites",
      data: {
        addedFavourite: favouriteProperty,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new AppError("Already in favourites", 409));
    }

    return next(error);
  }
};

export const removeFromFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { propertyId } = req.params;
    const userId = req.userId!;

    if (typeof propertyId !== "string" || !isValidObjectId(propertyId)) {
      throw new AppError("Invalid propertyId", 400);
    }

    const deletedFavourite = await FavouriteModel.findOneAndDelete({
      userId,
      propertyId,
    });

    if (!deletedFavourite) {
      throw new AppError("Favourite not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "Removed from favourites",
      data: {
        deletedFavourite: deletedFavourite,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId!;

    const favourites = await FavouriteModel.find({ userId }).sort({
      createdAt: -1,
    }).populate("propertyId");

    const properties = favourites.map(fav => fav.propertyId)

    return res.status(200).json({
      success: true,
      data: {
        favourites: properties,
      },
    });
  } catch (error) {
    next(error);
  }
};


