#Create database
query="create database manager;"

#Create Table
query="CREATE TABLE Admin (emp_id VARCHAR(15) NOT NULL PRIMARY KEY, name  VARCHAR(40), gender VARCHAR(10), email VARCHAR(40) NOT NULL UNIQUE, Address VARCHAR(200),dob VARCHAR(15),mobile VARCHAR(15) NOT NULL, password VARCHAR(200))"

#Insert into admin table
query="INSERT INTO Admin(emp_id, name, gender,email,address, dob, mobile,password) values('126353', 'harinder', 'Male','harinder@manager.com', 'chennai','02/02/2002', '7384836362','$5$rounds=535000$zQHpYNN7Ytv.Eq3K$UnRR9XyYQ7lHtHoxSbJpspNRXtOPKWFojeityBeThyA')"