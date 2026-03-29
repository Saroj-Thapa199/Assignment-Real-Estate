import app from "./app";
import { connectDB } from "./config/db";
import config from "./config/env";

const startServer = async () => {
  await connectDB();
  app.listen(config.PORT, () =>
    console.log(`App listening on port ${config.PORT}`),
  );
};

startServer();
