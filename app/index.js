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
    choices: ["View all departments", "View all roles", "View all employees"],
  },
];

const data = await inquirer.prompt(mainQuestions);

if (data.options === "View all departments") {
  viewDepartments();
} else if (data.options === "View all roles") {
  viewRoles();
} else if (data.options === "View all employees") {
  viewEmployees();
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

async function viewEmployees() {
  const [employees] = await conn.execute(
    "SELECT * from employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id"
  );
  console.table(employees);
}

// TODO: remove unnecessary IDs from viewRoles() and viewEmployees() tables
// TODO: show manager name instead of ID in viewEmployees()

conn.end();
