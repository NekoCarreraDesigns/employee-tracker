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

    create table role
    (
        id integer not null,
        title varchar (30),
        salary decimal (10,4),
        position_id integer,
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

    select *
    from department;
    select *
    from role;
    select *
    from employee;


    insert into department
        (id, name)
    values
        (12, "Development"),
        (13, "Advertising"),
        (14, "Legal"),
        (11, "Sales"),
        (15, "President");
    insert into role
        (id, title, salary, position_id)
    values
        (16, "Manager", 80000.00, 11),
        (17, "Developer", 150000.00, 12),
        (18, "Associate", 100000.00, 13),
        (19, "Lawyer", 200000.00, 14),
        (20, "President", 500000.00, 15);
    insert into employee
        (id, first_name, last_name, position_id, manager_id)
    values
        (1978, "Nicholas", "Maas", 12, 08),
        (1948, "Charles", "Maas", 15, null),
        (1997, "Samantha", "Tinoco", 14, 09),
        (1993, "Jessica", "Kalin", 13, 10),
        (1979, "Will", "Kerns", 11, 11),
        (1977, "Mike", "Christner", 11, 10),
        (1991, "Patrick", "Ellenburg", 13, 11),
        (2002, "Baley", "Culbert", 14, 09),
        (1994, "Caitlin", "McKee", 12, 08);

