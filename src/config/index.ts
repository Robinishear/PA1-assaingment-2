import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  SECRET_JWT: process.env.SECRET_JWT,
};

export default config;
