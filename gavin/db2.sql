create database cisc499;

use cisc499;

drop table if exists property ;
drop table if exists ownr ;
drop table if exists own ;
drop table if exists manager ;
drop table if exists manage ;
drop table if exists Picture_files;
drop table if exists Furnitures;
drop table if exists Rental_Agreement;
drop table if exists Make_Group;
drop table if exists Students;
drop table if exists Rental_Group;
drop table if exists Credential;

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
    
    date_listed varchar(255)
);


CREATE TABLE ownr (
	OID varchar(255),
	Fname varchar(255),
	Lname varchar(255),
    PhoneNo varchar(255),
    Address varchar(255)
);


create table own(
	PID int,
    OID varchar(255)
);

CREATE TABLE manager (
	PhoneNumber varchar(255),
	FName varchar(255),
	LName varchar(255)
);

create table manage(
	house_name varchar(255),
    PhoneNumber varchar(255),
    StartYear varchar(255),
    EndDate varchar(255)
);
create table Picture_files(
	PID int,
    File_name1 varchar(255),
    File_name2 varchar(255),
    File_name3 varchar(255),
    File_name4 varchar(255),
    File_name5 varchar(255),
    File_name6 varchar(255),
    File_name7 varchar(255),
    File_name8 varchar(255),
    File_name9 varchar(255),
    File_name10 varchar(255)
);

create table Furnitures(
	PID int,
    Furniture_name1 varchar(255),    
    Furniture_name2 varchar(255),
    Furniture_name3 varchar(255),
    Furniture_name4 varchar(255),
    Furniture_name5 varchar(255),
    Furniture_name6 varchar(255),
    Furniture_name7 varchar(255),
    Furniture_name8 varchar(255),
    Furniture_name9 varchar(255),
    Furniture_name10 varchar(255)

);

create table Rental_Agreement(
	PID int,
    GID int,
    Sign_Data date,
    End_Data date,
    Start_Data date,
    Monthly_rent varchar(255)
);

create table Make_Group(
	UID int,
    GID varchar(4)
);

CREATE TABLE Students (
	UID varchar(255),
	FName varchar(255),
	LName varchar(255),
	PhoneNo varchar(255),
	Address varchar(255),
	Student_ID int,
	Year_of_graduation date,
	Program varchar(255)
);

CREATE TABLE Rental_Group (
	GID varchar(4),
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
	UID varchar(255),
	Password_ varchar(255),
	Role_ varchar(255)
);

    
   

