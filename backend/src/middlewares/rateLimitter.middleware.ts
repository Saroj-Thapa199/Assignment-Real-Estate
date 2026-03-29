import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  limit: 25,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests, please try again later",
});