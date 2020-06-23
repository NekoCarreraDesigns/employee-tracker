//declare dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const { response } = require("express");
const cTable = require("console.table");
//declare express variable
const app = express();
//create server port and Heroku environment
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
            "View All Employees by Manager",
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
    connection.query("SELECT * FROM employees", (err, res) => {
        console.table(res);
        start();

    });
};
departmentView = () => {
    inquirer.prompt({
        type: "list",
        name: "deptViewer",
        message: "What Department would you like to view?",
        choices: ["Advertising", "Development", "Legal", "Sales", "President"]
    }).then((answers) => {
        switch (answers.deptViewer) {
            case "Advertising":
                return connection.query("SELECT first_name, last_name, role_id FROM employees WHERE role_id = 2 ", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Development":
                return connection.query("SELECT first_name, last_name, role_id FROM employees WHERE role_id = 1", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Legal":
                return connection.query("SELECT first_name, last_name, role_id FROM employees WHERE role_id = 3", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Sales":
                return connection.query("SELECT first_name, last_name, role_id FROM employees WHERE role_id = 4", (err, res) => {
                    console.table(res);
                    start();
                });
            case "President":
                return connection.query("SELECT first_name, last_name, role_id FROM employees WHERE role_id = 5", (err, res) => {
                    console.table(res);
                    start();
                });
        };
    });
};
managerView = () => {
    inquirer.prompt({
        type: "list",
        name: "bossman",
        message: "What department manager do you want?",
        choices: ["Nicholas Maas", "Jessica Kalin", "Samantha Tinoco", "Mike Christner"]
    }).then((answer) => {
        switch (answer.bossman) {
            case "Nicholas Maas":
                return connection.query("SELECT * FROM employees WHERE manager_id = 1", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Jessica Kalin":
                return connection.query("SELECT first_name, last_name FROM employees WHERE role_id = 4", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Samantha Tinoco":
                return connection.query("SELECT first_name, last_name FROM employees WHERE role_id = 3", (err, res) => {
                    console.table(res);
                    start();
                });
            case "Mike Christner":
                return connection.query("SELECT first_name, last_name FROM employees WHERE role_id = 2", (err, res) => {
                    console.table(res);
                    start();
                });


        };
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
        type: "list",
        message: "What is their department_id?",
        name: "role",
        choices: [1, 2, 3, 4, 5]

    }]).then((responses) => {
        connection.query("INSERT INTO employees SET ?",
            {

                first_name: responses.first_name,
                last_name: responses.last_name,
                role_id: responses.department
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
        type: "list",
        message: "What Employee would you like to remove?",
        name: "remover",
        choices: ["Samantha Tinoco", "Jessica Kalin", "Nicholas Maas", "Mike Christner",
            "Will Kerns", "Patrick Ellenburg", "Baley Culbert", "Caitlin Mckee", "Charles Maas"]
    }]).then((answer) => {
        connection.query("DELETE FROM employees WHERE ?", {
            remover: answer.choices

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
        choices: [connection.query("SELECT * FROM employees", (err, res) => {
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