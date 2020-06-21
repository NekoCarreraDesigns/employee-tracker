//declare dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { response } = require("express");
const cTable = require("console.table");
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
    console.log("Hola Amigo!");
    start();
});

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
        console.table(res);
        start();

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
                return connection.query("SELECT department.id, name, title, salary, position_id FROM department LEFT JOIN role ON name = position_id", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Development":
                return connection.query("SELECT FROM department LEFT JOIN  ON department.id = position_id", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Legal":
                return connection.query("SELECT name FROM department", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Sales":
                return connection.query("SELECT name FROM department", (err, res) => {
                    console.table(res);
                    start();
                });
        };
    });
};
managerView = () => {
    connection.query("SELECT * FROM employee LEFT JOiN role ON id = role.id", (err, res) => {
        console.table(res);
    });
};
addEmployee = () => {
    inquirer.prompt([{

        type: "input",
        message: "What is their first name?",
        name: "first_name"

    },
    {
        type: "input",
        message: "What is their last name?",
        name: "last_name"
    },
    {
        type: "input",
        message: "What is their id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is their position id?",
        name: "position_id"
    },
    {
        type: "input",
        message: "What is their manager id?",
        name: "manager_id"
    }]).then((responses) => {
        connection.query("INSERT INTO employee SET ?",
            {
                id: responses.id,
                first_name: responses.first_name,
                last_name: responses.last_name,
                position_id: responses.position_id,
                manager_id: responses.manager_id
            },
            (err, res) => {
                if (err) throw (err);
                console.table(res.affectedRows + "Employee Added!");
                start();
            });
    });
};
trashCompactor = () => {
    inquirer.prompt([{
        type: "input",
        message: "What is the first name of the employee?",
        name: "first_name"
    },
    {
        type: "input",
        Maessage: "What is their last name?",
        name: "last_name"
    },
    {
        type: "input",
        message: "What is their id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is their position id?",
        name: "position_id"
    },
    {
        type: "input",
        message: "What is their manager id?",
        name: "manager_id"
    }]).then((answer) => {
        connection.query("DELETE FROM employee WHERE manager_id = null", {
            id: answer.id,
            first_name: answer.first_name,
            last_name: answer.last_name,
            position_id: answer.position_id,
            manager_id: answer.manager_id
        }, (err, res) => {
            if (err) throw (err);
            console.table(res.affectedRows + "Employee Removed!");
            start();
        });
    });

};
updateEmployee = () => {
    inquirer.prompt({
        type: "list",
        message: "Select employee to update",
        name: "updater",
        choices: [connection.query("SELECT * FROM employee", (err, res) => {
            console.table(res)
        })]
    }).then((updates) => {
        switch (updates.updater) {
            case "Manager":
        }
    })
    connection.query("UPDATE employee SET ? WHERE ?", {

    }, (err, res) => {

    })
}
//listener for the server
app.listen(PORT, (err, data) => {
    console.log("I'm listening on port:" + PORT);
});