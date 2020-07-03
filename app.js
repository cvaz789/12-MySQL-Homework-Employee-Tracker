var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
    password: "Developer01",
    database: "app_db"
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
                "Update Information in Tables",
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
                
                case "Update Information in Tables":
                    updateData();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
};


function addData() {
    inquirer
        .prompt({
            name:"action",
            type:"list",
            message:"What would would you like to add?",
            choices: [
                "Add a new employee",
                "Add a new role",
                "Add a new department"
            ]
        }).then(function(answer) {
            switch (answer.action) {
                case "Add a new employee":
                    addEmp();
                    break;
                
                case "Add a new role":
                    addRole();
                    break;

                case "Add a new department":
                    addDept();
                    break;
            }
        })
};

function addEmp() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the Employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the Employee?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the role_id of the Employee?"
            },
            {
                name: "managerID",
                type: "input",
                message: "What is the manager_id of the Employee?"
            },
        ]).then(function(answer) {
           connection.query(
               "INSERT INTO employees SET ?",
               {
                   first_name: answer.name,
                   last_name: answer.lastName,
                   role_id: answer.roleId,
                   manager_id: answer.lastName.manager_id
               },
               function(err) {
                   if(err) throw err;
                   console.log("The employee has been added to the system")
                   runSearch();
               }
           )
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleName",
                type: "input",
                message: "Type the new title to add"
            },
            {
                name: "salaryAmount",
                type: "input",
                message: "Type the salary of the new title"
            },
            {
                name: "departmentID",
                type: "input",
                message: "Type the id of the department where the new employee will be residing"
            }
        ]).then(function(answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.roleName,
                    salary: answer.salaryAmount,
                    department_id: answer.departmentID
                },
                function(err) {
                    if(err) throw err;
                    runSearch();
                }
            )
        })
}

function addDept() {

    inquirer
        .prompt({
            name: "deptName",
            type: "input",
            message: "Type a new department name"
        }).then(function(answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dept_name: answer.deptName
                },
                function(err) {
                    if(err) throw err;
                    runSearch();
                }
            )
            
        })

}

function viewData() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to view?",
            choices: [
                "View all employees",
                "View all employees by Department",
                "Return"
            ]
        }).then(function(response) {
            switch(response.action) {
                case "View all employees":
                    allData();
                    break;

                case "View all employees by Department":
                    byDept();
                    break;

                case "Return":
                    runSearch();
                    break;
            }   
        })
};


function allData() {
    var query = "SELECT first_name, last_name, title, salary, dept_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON department.id = roles.department_id";
    connection.query(query, function(err,res) {
        console.log("hello");
        console.table(res);
        runSearch();
    })

}

function byDept() {
    inquirer
        .prompt({
            name:"action",
            type:"list",
            message:"Which department would you like to see employees for?",
            choices:[
                "Sales",
                "Legal",
                "Engineering",
                "Finance",
                "Executive",
                "Return"
            ]
        }).then(function(response) {
            switch(response.action) {
                case "Sales":
                    sales();
                    break;

                case "Legal":
                    legal();
                    break;
                
                case "Engineering":
                    engineering();
                    break;

                case "Finance":
                    finance();
                    break;

                case "Executive":
                    executive();
                    break;
                case "Return":
                    runSearch();
                    break; 
            }
        })
};

function sales() {
    var query = "SELECT dept_name, first_name, last_name FROM department INNER JOIN employees ON department.id = employees.role_id WHERE dept_name = 'Sales'";
    connection.query(query, function(err, res) {
        console.table(res);
        viewData();
    })
}

function legal() {
    var query = "SELECT dept_name, first_name, last_name FROM department INNER JOIN employees ON department.id = employees.role_id WHERE dept_name = 'Legal'";
    connection.query(query, function(err, res) {
        console.table(res);
        viewData();
    })
}

function engineering() {
    var query = "SELECT dept_name, first_name, last_name FROM department INNER JOIN employees ON department.id = employees.role_id WHERE dept_name = 'Engineering'";
    connection.query(query, function(err, res) {
        console.table(res);
        viewData();
    })
}

function finance() {
    var query = "SELECT dept_name, first_name, last_name FROM department INNER JOIN employees ON department.id = employees.role_id WHERE dept_name = 'Finance'";
    connection.query(query, function(err, res) {
        console.table(res);
        viewData();
    })
}

function executive() {
    var query = "SELECT dept_name, first_name, last_name FROM department INNER JOIN employees ON department.id = employees.role_id WHERE dept_name = 'Executive'";
    connection.query(query, function(err, res) {
        console.table(res);
        viewData();
    })
}

function updateData() {
    inquirer
        .prompt({
            name:"action",
            type:"list",
            message:"What table would you like to update?",
            choices:[
                "Employees",
                "Departments",
                "Roles",
                "return"
            ]
        }).then(function(answer) {
            switch (answer.action) {
                case "Employees":
                    upEmp();
                    break;
                case "Departments":
                    upDept();
                    break;
                case "Roles":
                    upRol();
                    break;
                case "return":
                    runSearch();
                    break;
            }
        })
};

function upEmp() {

    var query = "SELECT first_name, last_name FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON department.id = roles.department_id";
    connection.query(query, function(err,res) {
    console.table(res);
    });

    inquirer
        .prompt([
            {
                name: "employeeID",
                type: "input",
                message: "Enter the id of the employee you would like to update"
            },
            {
                name: "employeeName",
                type: "input",
                message: "Enter the name of the employee you would like to update"
            },
            {
                name: "lastName",
                type: "input",
                message: "Type the new last name of the employee"
            },
    ]).then(function(answer) {
        var query = connection.query( 
            "UPDATE employees SET ? WHERE ?",
            [
                {
                    first_name: answer.employeeName,
                    lasT_name: answer.lastName
                    
                },
                {
                    id: answer.employeeID
                }

            ],
            function(err, query) {
                if (err) throw err;
                console.log(query);
                runSearch();
            }

        )

        console.log(query.sql);
    })

}
// function upDept();
// function upRol();
