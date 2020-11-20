CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE employee_tab ( emp_id VARCHAR(7) PRIMARY KEY, name VARCHAR(30) NOT NULL, gender VARCHAR(10), address VARCHAR(500) NOT NULL, dob VARCHAR(10) NOT NULL, mobile VARCHAR(20) NOT NULL, email VARCHAR(40) NOT NULL UNIQUE, role VARCHAR(20) NOT NULL, password VARCHAR(100) NOT NULL);
INSERT INTO employee_tab(emp_id,name,gender,address,dob,mobile,email,role,password) VALUES('1795725','xxxxxx ','xxxxx','xxxxx','xxxxx','xxxxx','xxxxxxx','HR','$5$rounds=535000$7FZn5BeGFsUlILrL$9lx1lmmyzF3eroWXLO9cqDxbvzfjdkRQPBAN12QZ0A4');

/*
HASH your password using passlib package
sha256_crypt.hash("your password) in python terminal
*/
