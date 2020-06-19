//declare dependencies
const express = require("express")
const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require(console.table);
//declare express variable
const app = express();
//create server port
const PORT = process.env.PORT || 4000
//create database connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "8Limb$Thai1978",
    database: "employee_DB"
})
//connect to database
connection.connect(function (err) {
    if (err) throw (err);
    console.log("Shalom brother!")
    start();
})
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
// ])

//console.log(table)
//employe class constructor to enter a new employee
// class Employee {
//     constructor(id, firstname, lastname, department, salary, manager) {
//         this.id = id;
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.department = department;
//         this.salary = salary;
//         this.manager = manager;
//     }
// }
//variable to create new employee
// const employee = new Employee("this.id, this.firstname, this.lastname, this.department, this.salary, this.manager");
// console.log(employee);
// employee.push(employeeData);

//const employeeData = []


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
        ]
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
        }
    });
};
employeeView = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        console.log(res);

    })
}
app.listen(PORT, (err, data) => {
    console.log("I'm listening on port:" + PORT)
})