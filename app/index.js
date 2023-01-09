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
    choices: ["View all departments", "View all roles"],
  },
];

const data = await inquirer.prompt(mainQuestions);

if (data.options === "View all departments") {
  viewDepartments();
} else if (data.options === "View all roles") {
  viewRoles();
}

async function viewDepartments() {
  const [departments] = await conn.execute("SELECT * FROM department");
  console.table(departments);
}

async function viewRoles() {
  const [roles] = await conn.execute(
    "SELECT * FROM role JOIN department ON role.department_id = department.id"
  );
  console.table(roles);
}

conn.end();
