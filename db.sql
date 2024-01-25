create database cisc499;
use cisc499;
drop table property;

select * from property;

CREATE TABLE property (
    PID int NOT NULL AUTO_INCREMENT primary key,
    house_name varchar(255),
    Address varchar(255),
	house_type varchar(255),
    Monthly_rent float,
    
    bedroom int,
    bathroom int,
    parking_No int,
    laundry varchar(255),
    fenced_yard bool,
	Detached varchar(255),
    Floor int,
    elevator bool,
    number_of_people int,
    private_Kitchen bool,
    Funiture varchar(255),
    
    date_listed date
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

drop table Rental_Group;
CREATE TABLE Rental_Group (
	GID int,
	Preferred_type varchar(255),
	Bedroom int,
	Bathroom int,
	Parking_No int,
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
CREATE TABLE owner (
	OID varchar(255),
	Fname varchar(255),
	Lname varchar(255),
    PhoneNo_ID varchar(255)
);
CREATE TABLE manager (
	PhoneNumberD varchar(255),
	FName varchar(255),
	Role_ varchar(255),
	LName varchar(255)
);

create table manage(
	PID int,
    PhoneNumbaer varchar(255),
    StartYear date,
    EndDate date
);

create table own(
	PID int,
    OID int
);

create table Picturee_files(
	PID int,
    File_name varchar(255)
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
    GID int
);


        
INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,date_listed)
VALUES ('334 Kingscourt Ave', 1, 1,'6472609807','334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5','apartment',2349,
3,1,1,'Contact manager',false,'yes',
false,null,null,2023-11-7);

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('631 Aylmer Cres', 1, 1,'3432900940','631 Aylmer Cres, # 2, Kingston, ON K7M 6K3','apartment',1899,
2,1,1,'Contact manager',true,'yes',
false,null,null,2023-11-13);

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('136 Chatham St', 1, 1,'6135835252','136 Chatham St, Kingston, ON K7K 4H4','apartment',3000,
2,1,1,'In Unit',true,'yes',
false,null,null,2024-1-12);

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('1145 Coverdale Dr', 1, 1,'6135835252','1145 Coverdale Dr, Kingston, ON K7M 8X7','apartment',3000,
3,1,1,'In Unit',true,'yes',
false,null,null,2024-1-11);

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('139 Mowat Ave', 1, 1,'6474731623','139 Mowat Ave, Kingston, ON K7M 1K5','Single Family Residence',2700,
3,1,1,'Contact manager',true,'yes',
false,null,null,2024-1-4);

UPDATE property
SET stats = 'on market'
WHERE propertyID=1;

UPDATE property
SET stats = 'pending'
WHERE propertyID=2 or propertyID=3 or propertyID=4;

UPDATE property
SET stats = 'off market'
WHERE propertyID=5 or propertyID=6;

DELETE FROM property WHERE propertyID=1;

UPDATE property
SET Listdate = '2023-11-12'
WHERE propertyID=5 ;

UPDATE property
SET Listdate = '2023-11-12'
WHERE propertyID=4 ;

UPDATE property
SET Listdate = '2024-1-12'
WHERE propertyID=3 ;

UPDATE property
SET Listdate = '2024-1-11'
WHERE propertyID=2 ;

UPDATE property
SET Listdate = '2023-11-7'
WHERE propertyID=1 ;

select * from property;
