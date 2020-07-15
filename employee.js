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
    password: "",
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
            "View All Departments",
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Department",
            "Remove Department",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ],
        //switch statement for options
    }).then((answers) => {
        switch (answers.intro) {
            case "View All Departments":
                return viewAllDept();
                break;
            case "View All Employees":
                return employeeView();
                break;
            case "View All Employees by Department":
                return departmentView();
                break;
            case "View All Employees by Manager":
                return managerView();
                break;
            case "Add Department":
                return deptAdder();
                break;
            case "Remove Department":
                return deptRemover();
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
    connection.query("SELECT * FROM employees INNER JOIN roles ON manager_id = department_id "
        , (err, res) => {
            if (err) throw err;
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
        choices: [{ value: 1, name: "Development", short: "1-Development" },
        { value: 2, name: "Advertising", short: "2-Advertising" },
        { value: 3, name: "legal", short: "3-Legal" },
        { value: 4, name: "Sales", short: "4-Sales" },
        { value: 5, name: "President", short: "5-President" }]

    }]).then((responses) => {
        connection.query("INSERT INTO employees SET ?",
            {
                first_name: responses.first_name,
                last_name: responses.last_name,
                role_id: responses.role
            },
            (err, res) => {
                if (err) throw err;
                console.table(res.affectedRows + "Employee Added!");
                start();
            });
    });
};
deptAdder = () => {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What department are you adding"
    }).then((answer) => {
        connection.query("INSERT INTO departments SET ?", {
            name: answer.name
        }, (err, res) => {
            if (err) throw err;
            console.table(res.affectedRows + "Department Added");
            start();
        });
    });
};
deptRemover = () => {
    inquirer.prompt({
        type: "input",
        message: "What department do you want to remove?",
        name: "name"
    }).then((answer) => {
        connection.query("DELETE FROM departments WHERE ?", { name: answer.name }, (err, res) => {
            if (err) throw err;
            console.table(res.affectedRows = "Department Removed!")
            start();
        });
    });
};
viewAllDept = () => {
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}
trashCompactor = () => {
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
        message: "What is their role id?",
        name: "role_id"
    }]).then((answer) => {
        connection.query("DELETE FROM employees WHERE id = 12", {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id

        }, (err, res) => {
            if (err) throw err;
            console.table(res.affectedRows + "Employee Removed!");
            start();
        });
    });

};
updateEmployee = () => {
    inquirer.prompt({
        type: "list",
        message: "What is their new role?",
        name: "role_id",
        choices: [{ value: 1, name: "Development", short: "1-Development" },
        { value: 2, name: "Advertising", short: "2-Advertising" },
        { value: 3, name: "Legal", short: "3-Legal" },
        { value: 4, name: "Sales", short: "4-Sales" },
        { value: 5, name: "President", short: "5-President" },
        { value: 6, name: "Vice President", short: "6-Vice President" }]

    },
        {
            type: "input",
            message: "What is their first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is their last name?",
            name: "last_name"
        }).then((answer) => {
            connection.query("UPDATE employees SET ? WHERE ?", {
                role_id: answer.choices,
                first_name: answer.first_name,
                last_name: answer.last_name
            }, (err, res) => {
                if (err) throw err;
                console.table(res.affectedRows + "Employee Role Updated");
                start();
            });
        });
};
managerUpdate = () => {
    inquirer.prompt({
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
            message: "What is their new manager id?",
            name: "manager_id"
        }).then((answer) => {
            connection.query("UPDATE employees SET ? WHERE manager_id = ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id

                }, (err, res) => {
                    if (err) throw err;
                    console.table(res.affectedRows + "Manager Updated!");
                    start();
                });
        });
};
//listener for the server
app.listen(PORT, (err, data) => {
    if (err) throw err;
    console.log("I'm listening on port:" + PORT);
});