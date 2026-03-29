import express from "express";
import { addToFavourites, getFavourites, removeFromFavourites } from "../controllers/favourites.controller";
import { validateRequest } from "../middlewares/auth.middleware";

const favouriteRouter = express.Router();

favouriteRouter.post("/:propertyId", addToFavourites);
favouriteRouter.delete("/:propertyId", removeFromFavourites);
favouriteRouter.get("/", validateRequest, getFavourites);

export default favouriteRouter;
