import mysql from "mysql2/promise";
import config from "./config.js";

// Creates connection to the database using the imported config
const conn = await mysql.createConnection(config.db);
