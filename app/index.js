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
    "SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, role.title, role.salary, department.name FROM employee JOIN role on employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee manager ON manager.id = employee.manager_id"
  );
  console.table(employees);
}

async function addDepartment() {
  const data = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the department name?",
    },
  ]);
  conn.execute(
    `INSERT INTO department (department.name) VALUES ("${data.newDepartment}")`
  );
  viewDepartments();
}

async function addRole() {
  const [departmentList] = await conn.execute("SELECT * FROM department");
  const departmentChoices = departmentList.map((department) => ({
    name: department.name,
    value: department.id,
  }));

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
      type: "list",
      name: "roleDepartment",
      message: "Which department does the role belong to?",
      choices: departmentChoices,
    },
  ]);
  conn.execute(
    `INSERT INTO role (role.title, role.salary, role.department_id) VALUES ("${data.roleName}", "${data.roleSalary}", "${data.roleDepartment}")`
  );
  viewRoles();
}

async function addEmployee() {
  const [roleList] = await conn.execute("SELECT role.title, role.id FROM role");
  const roleChoices = roleList.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const [managerList] = await conn.execute(
    "SELECT employee.manager_id, employee.first_name, employee.id FROM employee WHERE employee.manager_id IS NULL"
  );
  const managerChoices = managerList.map((employee) => ({
    name: employee.first_name,
    value: employee.id,
  }));

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
      type: "list",
      name: "employeeRole",
      message: "What is the employee's role?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Who is the employee's manager?",
      choices: managerChoices,
    },
  ]);
  conn.execute(
    `INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.employeeRole}", "${data.employeeManager}")`
  );
  viewEmployees();
}

// conn.end();

// TODO: go back to main questions after prompts
