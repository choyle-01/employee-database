const inquirer = require("inquirer");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect(function (err, res) {
  init();
});

const firstQuestion = {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
    "View all Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Roles",
    "View All Departments",
    "Add Department",
    "Quit",
  ],
};

const init = () => {
  inquirer.prompt(firstQuestion).then((answer) => {
    switch (answer.choice) {
      case "View all Employees":
        viewEmployees();
        break;
      case "Add Employee":
        employeeAdd();
        break;
      case "Update Employee Role":
        updateRole();
        break;
      case "View All Roles":
        viewRole();
        break;
      case "Add Roles":
        roleAdd();
        break;
      case "View All Departments":
        viewDepartment();
        break;
      case "Add Department":
        departmentAdd();
        break;
      case "Quit":
        process.exit();
        break;
    }
  });
};

const addingDepartment = {
  type: "input",
  message: "What is the name of the department you would like to add?",
  name: "depName",
};

const addingRole = [
  {
    type: "input",
    message: "What is the role you would like to add?",
    name: "role",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary",
  },
  {
    type: "choice",
    message: "Which department does the role belng to?",
    name: "department",
    choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
  },
];

const updateRole = [
  {
    type: "choice",
    message: "Which employee's role do you wish to update?",
    name: "updateRole",
    choices: [],
  },
  {
    type: "choice",
    message: "Which role do you want to assign the selected employee?",
    name: "assignRole",
    choices: [],
  },
];

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  init();
};

const viewRole = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  init();
};

const viewDepartment = () => {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
  });
  init();
};

const departmentAdd = () => {
  inquirer.prompt(addingDepartment).then((answer) => {
    db.query("INSERT INTO department SET ?", {
      name: answer.depName,
    });
    init();
  });
};

const roleAdd = () => {
  inquirer.prompt(addingRole).then((answer) => {
    
  });
};

const employeeAdd = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "lastName",
        },
        {
          type: "choice",
          message: "What is the employee's role?",
          name: "role",
          choices: res.map((role) => role.title),
        },
      ])
      .then((answer) => {
        var firstName = answer.firstName;
        var lastName = answer.lastName;
        var selectedRole = res.find((role) => role.title === answer.role);
        db.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: "choice",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: res.map((employee) => employee.first_name),
              },
            ])
            .then((answer) => {
              var chosenManager = res.find(
                (employee) => employee.first_name === answer.manager
              );
              db.query("INSERT INTO employee SET ?", {
                first_name: firstName,
                last_name: lastName,
                role: selectedRole.id,
                manager: chosenManager.id,
              });
              init();
            });
        });
      });
  });
};

const roleUpdate = () => {
  inquirer.prompt(updateRole).then((answer) => {
    if (answer.choice === "") {
    }
  });
};
