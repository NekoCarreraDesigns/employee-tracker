drop database if exists employee_DB;

create database employee_DB;

use employee_DB;

create table department
(
    id integer
    auto_increment not null,
    name varchar
    (30),
    primary key
    (id)
);
    create table position
    (
        id integer not null,
        title varchar (30),
        salary decimal (6),
        primary key (id)
    );

    create table employee
    (
        id integer not null,
        first_name varchar (30),
        last_name varchar (30),
        position_id integer,
        manager_id integer
    );
    insert into department
        (id, name)
    values
        (1, "Development"),
        (2, "Advertising"),
        (3, "Legal"),
        (4, "Sales");
    insert into position
        (id, title, salary)
    values
        (11, "Manager", 80000.00),
        (12, "Developer", 150000.00),
        (13, "Associate", 100000.00),
        (14, "Lawyer", 200000.00);
    insert into employee
        (id, first_name, last_name, position_id, manager_id)
    values
        (1978, "Nicholas", "Maas", 12, null),
        (1997, "Samantha", "Tinoco", 14, null),
        (1993, "Jessica", "Kalin", 13, "Will Kerns"),
        (1979, "Will", "Kerns", 11, null),
        (1979, "Mike", "Christner", 11, null),
        (1991, "Patrick", "Ellenburg", 13, "Will Kerns"),
        (2002, "Baley", "Culbert", 14, "Samantha Tinoco");