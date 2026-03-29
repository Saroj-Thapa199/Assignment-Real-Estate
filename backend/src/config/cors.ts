import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

export const configureCors = () => {
  return cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  });
};
