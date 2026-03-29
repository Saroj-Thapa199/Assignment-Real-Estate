import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import favouriteRouter from "./routes/favourites.route";
import { validateRequest } from "./middlewares/auth.middleware";
import { configureCors } from "./config/cors";
import helmet from "helmet";
import morgan from "morgan";
import { getAllProperties } from "./controllers/property.controller";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(configureCors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
// app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/favourites", validateRequest, favouriteRouter);
app.use("/api/v1/properties", getAllProperties);

// Centralized error handler
app.use(errorHandler);

export default app;
