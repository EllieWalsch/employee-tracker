INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal')
;

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1),
       (2, 'Salesperson', 80000, 1),
       (3, 'Lead Engineer', 150000, 2),
       (4, 'Software Engineer', 120000, 2),
       (5, 'Account Manager', 160000, 3),
       (6, 'Accountant', 125000, 3),
       (7, 'Legal Team Lead', 250000, 4),
       (8, 'Lawyer', 190000, 4)
;

INSERT INTO employee (first_name, last_name, id, manager_id, role_id)
VALUES ('John', 'Doe', 1, NULL, 1),
       ('Mike', 'Chan', 2, 1, 2),
       ('Ashley', 'Rodriguez', 3, NULL, 3),
       ('Kevin', 'Tupik', 4, 3, 4),
       ('Kunal', 'Singh', 5, NULL, 5),
       ('Malia', 'Brown', 6, 5, 6),
       ('Sarah', 'Lourd', 7, NULL, 7),
       ('Tom', 'Allen', 8, 7, 8)
;

