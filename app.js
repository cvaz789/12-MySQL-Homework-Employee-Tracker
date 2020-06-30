var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
    password: "Developer01",
    database: "application_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
})

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles",
                "Exit"
            ]
        }).then(function(answer) {
            switch(answer.action) {
                case "Add departments, roles, employees":
                    addData();
                    break;

                case "View departments, roles, employees":
                    viewData();
                    break;
                
                case "Update employee roles":
                    updateData();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
};


function viewData() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "View all employees",
                "View all employees by Department",
                "View all employees by Manager",
                "View all Departments",
                "View all Roles"
            ]
        }).then(function(response) {
            switch(response.action) {
                case "View all employees":
                    allData();
                    break;

                case "View all employees by Department":
                    byDept();
                    break;
                
                case "View all employees by Manager":
                    byMngr();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }   
         })
}


function allData() {
    var query = "SELECT first_name, last_name, title, salary, dept_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON department.id = roles.department_id";
    connection.query(query, function(err,res) {
        console.table(res);
        runSearch();
    })

}

function byDept() {
    var query = "SELECT * FROM department INNER JOIN roles ON  roles.department_id = department.id";
    connection.query(query, function(err,res) {
        console.table(res);
        runSearch();
    })
}