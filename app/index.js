import mysql from "mysql2/promise";
import config from "./config.js";
import cTable from "console.table";
import inquirer from "inquirer";

// Creates connection to the database using the imported config
const conn = await mysql.createConnection(config.db);

const mainQuestions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["View all departments", "blabla"],
  },
];

const data = await inquirer.prompt(mainQuestions);

if (data.options === "View all departments") {
  const [departments] = await conn.execute("SELECT * FROM department");
  console.table(departments);
}

conn.end();
