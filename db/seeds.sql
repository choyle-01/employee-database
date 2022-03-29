USE employees_db;
INSERT INTO department(id, name)
VALUES
(001, 'Sales'),
(002, 'Engineering'),
(003, 'Finance'),
(004, 'Legal');

INSERT INTO role (id, title, salary, department)
VALUES
(0001, 'Sales', 100000, 001),
(0002, 'Salesperson', 80000, 001),
(0003, 'Lead Engineer', 150000, 002),
(0004, 'Software Engineer', 120000, 002),
(0005, 'Account Manager', 160000, 003),
(0006, 'Accountant', 125000, 003),
(0007, 'Legal Team Lead', 250000, 004),
(0008, 'Lawyer', 190000, 004);

INSERT INTO employee(id, first_name, last_name, role, manager)
VALUES
(01, 'Joe', 'Smith', 001, null),
(02, 'Jackson', 'Ross', 005, null),
(03, 'Jonnathan', 'Ford', 006, null),
(04, 'Brad', 'Davis', 006, null),
(05, 'Austin', 'Perry', 001, null),
(06, 'Robert', 'Sanches', 004, null),
(07, 'Ethan', 'Draper', 001, null),
(08, 'Korbin', 'Little', 002, null),
(09, 'Zachary', 'Brown', 003, null),
(10, 'Jordan', 'Driggers', 005, null);