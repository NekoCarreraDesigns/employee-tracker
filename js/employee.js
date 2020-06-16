//declare dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require(console.table);
//creata database connection
const connection = mysql.createConnection({
    host: "employeehost",
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
const table = cTable.getTable([{
    id: "",
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    salary: 100000,
    manager: "",

},
])

console.log(table)
//employe class constructor to enter a new employee
class Employee {
    constructor(id, firstname, lastname, department, salary, manager) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }
}
//variable to create new employee
const employee = new Employee(this.id, this.firstname, this.lastname, this.department, this.salary, this.manager);
console.log(employee);
employee.push(employeeData);

const employeeData = []


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
    }).then(function (answers) {
        if (answers.intro === "View All Employees") {
            return employeeData
        }
    });
};
function department() {
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "What department would you like to view?",
        c
    })
}