-- Create a new database and use it
CREATE DATABASE IF NOT EXISTS cisc499;
USE cisc499;

-- Drop tables if they exist to prevent errors
DROP TABLE IF EXISTS Rental_Agreement;
DROP TABLE IF EXISTS Make_Group;
DROP TABLE IF EXISTS Picturee_files;
DROP TABLE IF EXISTS own;
DROP TABLE IF EXISTS manage;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS ownr;
DROP TABLE IF EXISTS Credential;
DROP TABLE IF EXISTS Rental_Group;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS property;

CREATE TABLE property (
    PID int NOT NULL AUTO_INCREMENT primary key,
    house_name varchar(255),
    Address varchar(255),
    house_type varchar(255),
    Monthly_rent int,
    bedroom int,
    bathroom int,
    parking bool,
    laundry varchar(255),
    fenced_yard bool,
    Detached varchar(255),
    Floor int,
    elevator bool,
    number_of_people int,
    private_Kitchen bool,
    Furniture varchar(255),
    date_listed date,
    stats varchar(255) 

CREATE TABLE Students (
    UID varchar(255) PRIMARY KEY,
    FName varchar(255),
    LName varchar(255),
    PhoneNo varchar(255),
    Address varchar(255),
    Student_ID int,
    Year_of_graduation date,
    Program varchar(255)
);

CREATE TABLE Rental_Group (
    GID varchar(4) PRIMARY KEY,
    Preferred_type varchar(255),
    Bedroom int,
    Bathroom int,
    Parking bool,
    Laundry varchar(255),
    Range_lower_bound int,
    Range_upper_bound int,
    accessibility bool
);

CREATE TABLE Credential (
    UID varchar(255) PRIMARY KEY,
    Password_ varchar(255),
    Role_ varchar(255)
);

CREATE TABLE ownr (
    OID varchar(255) PRIMARY KEY,
    Fname varchar(255),
    Lname varchar(255),
    PhoneNo_ID varchar(255) UNIQUE,
    Address varchar(255)
);

CREATE TABLE manager (
    PhoneNumber varchar(255) PRIMARY KEY,
    FName varchar(255),
    LName varchar(255)
);

CREATE TABLE manage (
    PID int,
    PhoneNumber varchar(255),
    StartYear date,
    EndDate date,
    PRIMARY KEY (PID, PhoneNumber),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (PhoneNumber) REFERENCES manager (PhoneNumber)
);

CREATE TABLE own (
    PID int,
    OID varchar(255),
    PRIMARY KEY (PID, OID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (OID) REFERENCES ownr (OID)
);

CREATE TABLE Picture_files (
    PID int,
    File_name varchar(255),
    PRIMARY KEY (PID, File_name),
    FOREIGN KEY (PID) REFERENCES property (PID)
);

CREATE TABLE Rental_Agreement (
    PID int,
    GID varchar(4),
    Sign_Data date,
    End_Data date,
    Start_Data date,
    Monthly_rent varchar(255),
    PRIMARY KEY (PID, GID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (GID) REFERENCES Rental_Group (GID)
);

CREATE TABLE Make_Group (
    UID varchar(255),
    GID varchar(4),
    PRIMARY KEY (UID, GID),
    FOREIGN KEY (UID) REFERENCES Students (UID),
    FOREIGN KEY (GID) REFERENCES Rental_Group (GID)
);

INSERT INTO property (house_name, Address, house_type, Monthly_rent, bedroom, bathroom, parking, laundry, fenced_yard, Detached, elevator, number_of_people, private_Kitchen, Furniture, date_listed)
VALUES
('334 Kingscourt Ave', '334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5', 'Apartment', 2349, 3, 1, true, 'shared', false, 'yes', false, NULL, true, 'bed, desk, chair', '2023-11-7'),
('631 Aylmer Cres', '631 Aylmer Cres, # 2, Kingston, ON K7M 6K3', 'Apartment', 1899, 2, 1, true, 'shared', true, 'yes', false, NULL, true, 'bed, desk, chair', '2023-11-13'),
('136 Chatham St', '136 Chatham St, Kingston, ON K7K 4H4', 'Apartment', 3000, 2, 1, true, 'ensuite', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-12'),
('1145 Coverdale Dr', '1145 Coverdale Dr, Kingston, ON K7M 8X7', 'Apartment', 3000, 3, 1, true, 'ensuite', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-11'),
('139 Mowat Ave', '139 Mowat Ave, Kingston, ON K7M 1K5', 'Single Family Residence', 2700, 3, 1, true, 'shared', true, 'yes', false, NULL, true, 'bed, desk, chair', '2024-1-4');

UPDATE property
SET stats = 'on market'
WHERE house_name = '334 Kingscourt Ave' AND Address = '334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5';

UPDATE property
SET stats = 'pending'
WHERE PID=2 OR PID=3 OR PID=4;

UPDATE property
SET stats = 'off market'
WHERE PID=5 OR PID=6;

DELETE FROM property WHERE PID = 1;

UPDATE property
SET date_listed = '2023-11-12'
WHERE PID=5;

UPDATE property
SET date_listed = '2023-11-12'
WHERE PID=4;

UPDATE property
SET date_listed = '2024-1-12'
WHERE PID=3;

UPDATE property
SET date_listed = '2024-1-11'
WHERE PID=2;

UPDATE property
SET date_listed = '2023-11-7'
WHERE PID=1;

SELECT * FROM property;
