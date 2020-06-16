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
)
