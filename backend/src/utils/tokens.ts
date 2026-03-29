import jwt from "jsonwebtoken";
import config from "../config/env";

export interface JwtPayload {
  userId: string;
}

const { JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRES } = config;

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES as jwt.SignOptions["expiresIn"],
  });

  return token;
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
};
