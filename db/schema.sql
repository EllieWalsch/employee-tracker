DROP DATABASE IF EXISTS HW_team;
CREATE DATABASE HW_team;

USE HW_team;

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);