drop database if exists employee_DB;

create database employee_DB;

use employee_DB;

create table departments
(
    id INTEGER
    auto_increment primary key,
    name varchar
    (30) not null
);

    create table roles
    (
        id integer
        auto_increment primary key,
        title varchar
        (30) not null,
        salary decimal
        (10,4) not null,
        department_id integer not null,
        constraint fk_department FOREIGN KEY
        (department_id) REFERENCES departments
        (id) 
        
    );

        create table employees
        (
            id integer
            auto_increment PRIMARY KEY,
        first_name varchar
            (30) not null,
        last_name varchar
            (30) not null,
        role_id integer not null,
        manager_id integer null,
        constraint fk_role foreign key
            (role_id) REFERENCES roles
            (id),
        constraint fk_manager foreign key
            (manager_id) REFERENCES employees
            (id)
        
    );

            select *
            from departments;
            select *
            from roles;
            select *
            from employees;


            insert into departments
                (name)
            values
                ("Development"),
                ("Advertising"),
                ("Legal"),
                ("Sales"),
                ("President");
            insert into roles
                (title, salary, department_id)
            values
                ("Sales", 80000.00, 4),
                ("Developer", 150000.00, 1),
                ("Associate", 100000.00, 2),
                ("Lawyer", 200000.00, 3),
                ("President", 500000.00, 5);
            insert into employees
                (first_name, last_name, role_id, manager_id)
            values
                ("Nicholas", "Maas", 1, 1),
                ("Charles", "Maas", 5, null),
                ("Samantha", "Tinoco", 3, 3),
                ("Jessica", "Kalin", 4, 4),
                ("Will", "Kerns", 2, null),
                ("Mike", "Christner", 2, 5),
                ("Patrick", "Ellenburg", 4, 6),
                ("Baley", "Culbert", 3, null ),
                ("Caitlin", "McKee", 1, null);

