DROP DATABASE IF EXISTS application_db;
CREATE DATABASE application_db;

USE application_db;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    dept_name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(50),
    salary DECIMAL(10,4),
    department_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO department(dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Executive");

INSERT INTO roles(title, salary, department_id)
VALUES("Sales Lead", 10000, 1), ("Lead Engineer", 150000, 2 ), ("Accountant", 16000, 3), ("Legal Team Lead", 250000, 4),("Accountant", 125000, 3), ("Software Engineer", 120000, 2), ("Director", 400000, 5);

INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Anna", "Arendt", 4),("Neil", "Diamond", 2),("Eros", "Ramazzoti", 2),("Laura", "Pausini", 1),("John", "Oliver", 3),("Placido", "Rodriguez", 3), ("Bill", "Gates", 3), ("Christian", "Vazquez", 7);


select * from roles;





