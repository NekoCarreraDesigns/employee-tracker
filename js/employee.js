//declare dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require(console.table);
//creata database connection
const connection = mysql.createConnection({
    host: "employeeHost",
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
// created console.table to print to terminal
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

// console.log(table)



//initial function prompt for app with list of options
function start() {
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
            "Update Employee Manager"
        ]
    })
}