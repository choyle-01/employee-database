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
        roleUpdate();
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
    type: "input",
    message: "What is the id of the department this role belongs to?",
    name: "department",
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
    db.query("INSERT INTO role SET?", {
      title: answer.role,
      salary: answer.salary,
      department: answer.department,
    });
    init();
  });
};

const employeeAdd = function () {
  db.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name",
          name: "firstName",
        },
        {
          type: "input",
          message: "Enter the employee's last name",
          name: "lastName",
        },
        {
          name: "role",
          type: "rawlist",
          choices: function () {
            var choiceArr = [];
            for (i = 0; i < data.length; i++) {
              choiceArr.push(data[i].title);
            }
            return choiceArr;
          },
          message: "Select title",
        },
        {
          name: "manager",
          type: "number",
          message: "Enter manager ID",
          default: "1",
        },
      ])
      .then(function (answer) {
        db.query("INSERT INTO employee SET ?", {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager
        });
        init();
      });
  });
};

const roleUpdate = () => {
  db.query("SELECT * FROM role", async function (err, data) {
    var role = data.map(function (role) {
      return {
        role: role.title,
      };
    });
    db.query("SELECT * FROM employee", async function (err, data) {
      var employee = data.map(function (employee) {
        return {
          name: employee.first_name + " " + employee.last_name,
        };
      });

      var questions = [
        {
          type: "list",
          message: "What employee's role would you like to update?",
          name: "employee",
          choices: employee,
        },
        {
          type: "list",
          message: "What role do want to assign to the employee?",
          name: "role",
          choices: role,
        },
      ];

      inquirer.prompt(questions).then(function (answer) {
        db.query(`UPDATE employee SET `);
      });
    });
  });
};
