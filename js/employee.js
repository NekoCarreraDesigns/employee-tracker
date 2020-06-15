const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require(console.table);

const connection = mysql.createConnection({
    host: "employeeHost",
    port: 3306,
    user: "root",
    password: "8Limb$Thai1978",
    database: "employee_DB"
})

connection.connect(function (err) {
    if (err) throw (err);
    console.log("Shalom brother!")
    start();
})

function start() {
    inquirer.prompt({
        name: "intro",
        type: "list",
        message: "What would you lie to do?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    })
}