import dotenv from "dotenv";

dotenv.config();

// exports the object with necessary configuration
// other modules can use this object as needed
// only this module directly accesses the ENV (hidden stuff) file
export default {
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
};
