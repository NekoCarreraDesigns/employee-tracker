//declare dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require(console.table);
//declare express variable
const app = express();
//create server port
const PORT = process.env.PORT || 4000;
//create database connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "8Limb$Thai1978",
    database: "employee_DB"
});
//connect to database
connection.connect(function (err) {
    if (err) throw (err);
    console.log("Shalom brother!");
    start();
});
//created console.table to print to terminal
// const table = cTable.getTable([{
//     id: "",
//     firstName: "",
//     lastName: "",
//     title: "",
//     department: "",
//     salary: 100000,
//     manager: "",

// },
// ]);

//console.log(table)

//initial function prompt for app with list of options
start = () => {
    inquirer.prompt({
        name: "intro",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ],
        //switch statement for options
    }).then((answers) => {
        switch (answers.intro) {
            case "View All Employees":
                return employeeView();
                break;
            case "View All Employees by Department":
                return departmentView();
                break;
            case "View All Employees by Manager":
                return managerView();
                break;
            case "Add Employee":
                return addEmployee();
                break;
            case "Remove Employee":
                return trashCompactor();
                break;
            case "Update Employee Role":
                return updateEmployee();
                break;
            case "Update Employee Manager":
                return managerUpdate();
                break;
            case "exit":
                return connection.end();
        };
    });
};
employeeView = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        console.log(res);

    });
};
departmentView = () => {
    inquirer.prompt({
        type: "list",
        name: "deptViewer",
        message: "What Department would you like to view?",
        choices: ["Advertising", "Development", "Legal", "Sales"]
    }).then((answers) => {
        switch (answers.deptViewer) {
            case "Advertising":
                return connection.query("SELECT * FROM department INNER JOIN employee ON department.id = employee.id ", (err, res) => {
                    console.log(res);
                });
            case "Development":
                return connection.query("SELECT * FROM department INNER JOIN employee ON department.id = employee.id", (err, res) => {
                    console.log(res);
                });
            case "Legal":
                return connection.query("SELECT name FROM department", (err, res) => {
                    console.log(res);
                });
            case "Sales":
                return connection.query("SELECT name FROM department", (err, res) => {
                    console.log(res);
                });
        };
    });
    // connection.query("SELECT * FROM department", (err, res) => {
    //     console.log(res);
    // })
};
managerView = () => {
    connection.query("SELECT * FROM employee INNER JOiN position ON employee.id = position.title", (err, res) => {
        console.log(res);
    });
};
addEmployee = () => {
    inquirer.prompt({
        type: "input",
        message: "What is their name?",
        name: "name"
    },
        {
            type: "input",
            message: "What is their role?",
            name: "role"
        },
        {
            type: "input",
            message: "What is their department?",
            name: "Department"
        },
        {
            type: "input",
            message: "Who is their Manager?",
            name: "captain"
        }).then((answers) => {
            console.log(answers);
        })
}
//listener for the server
app.listen(PORT, (err, data) => {
    console.log("I'm listening on port:" + PORT);
});