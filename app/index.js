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
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
    ],
  },
];

const data = await inquirer.prompt(mainQuestions);

if (data.options === "View all departments") {
  viewDepartments();
} else if (data.options === "View all roles") {
  viewRoles();
} else if (data.options === "View all employees") {
  viewEmployees();
} else if (data.options === "Add a department") {
  addDepartment();
} else if (data.options === "Add a role") {
  addRole();
} else if (data.options === "Add an employee") {
  addEmployee();
}

async function viewDepartments() {
  const [departments] = await conn.execute("SELECT * FROM department");
  console.table(departments);
}

async function viewRoles() {
  const [roles] = await conn.execute(
    "SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id"
  );
  console.table(roles);
}

async function viewEmployees() {
  const [employees] = await conn.execute(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id"
  );
  console.table(employees);
}

// TODO: show manager name instead of ID in viewEmployees()

async function addDepartment() {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the department name?",
    },
  ]);
  console.log(data.newDepartment);
}

async function addRole() {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the role name?",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary?",
    },
    {
      type: "input",
      name: "roleDepartment",
      message: "What is the department?",
    },
  ]);
  console.log(data.roleName, data.roleSalary, data.roleDepartment);
}

async function addEmployee() {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "input",
      name: "employeeRole",
      message: "What is the employee's role?",
    },
    {
      type: "input",
      name: "employeeManager",
      message: "Who is the employee's manager?",
    },
  ]);
  console.log(
    data.firstName,
    data.lastName,
    data.employeeRole,
    data.employeeManager
  );
}

// TODO: add all new input to tables
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

conn.end();
