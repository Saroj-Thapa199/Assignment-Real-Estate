import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  MONGO_URI: string;
  nodeEnv: string;
  JWT_ACCESS_SECRET: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 8000,
  MONGO_URI: process.env.MONGO_URI as string,
  nodeEnv: process.env.NODE_ENV || "development",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "any_secret_access",
};

export default config;
