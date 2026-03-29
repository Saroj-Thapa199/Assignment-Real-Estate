import jwt from "jsonwebtoken";
import config from "../config/env";

export interface JwtPayload {
  userId: string;
}

const { JWT_ACCESS_SECRET } = config;

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
};
