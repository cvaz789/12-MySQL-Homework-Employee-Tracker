DROP DATABASE IF EXISTS application_db;
CREATE DATABASE application_db;

USE application_db;

CREATE TABLE department (
    id INT(10) AUTO_INCREMENT,
    dept_name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id INT(10) AUTO_INCREMENT,
    title VARCHAR(50),
    salary DECIMAL(10,4),
    department_id INT(10),
    PRIMARY KEY(id)
);

CREATE TABLE employees(
    id INT(10),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT(10),
    manager_id INT(10),
    PRIMARY KEY(id)
);


INSERT INTO department(id, dept_name)
VALUES (1,"Sales"), (2, "Engineering"), (3, "Finance"), (4, "Legal"), (5, "Executive");

INSERT INTO roles(id, title, salary, department_id)
VALUES(1, "Sales Lead", 10000, 1), (2, "Lead Engineer", 150000, 2 ), (3, "Accountant", 16000, 3), (4, "Legal Team Lead", 250000, 4), (5, "Accountant", 125000, 3), (6, "Software Engineer", 120000, 2), (7, "Director", 400000, 5) ;

INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Laura", "Rodriguez", 1, 9),(2, "Anna", "Arendt", 4, 9),(3, "Neil", "Diamond", 2, 9),(4, "Eros", "Ramazzoti", 2, 9),(5, "Laura", "Pausini", 1, 9),(6, "John", "Oliver", 3, 9),(7, "Placido", "Rodriguez", 3, 9), (8, "Bill", "Gates", 3, 9), (9, "Christian", "Vazquez", 7, 9);



select * from employees

