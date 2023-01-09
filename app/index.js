import mysql from "mysql2/promise";
import config from "./config.js";
import cTable from "console.table";

// Creates connection to the database using the imported config
const conn = await mysql.createConnection(config.db);

const [departments] = await conn.execute("SELECT * FROM department");
console.table(departments);

conn.end();
