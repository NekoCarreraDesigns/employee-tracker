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