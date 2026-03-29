import express from "express";
import { getAllProperties } from "../controllers/property.controller";

const propertyRouter = express.Router();

propertyRouter.get("/", getAllProperties);

export default propertyRouter;
