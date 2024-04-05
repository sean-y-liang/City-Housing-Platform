create database cisc499;

use cisc499;

drop table if exists property ;
drop table if exists ownr ;
drop table if exists own ;
drop table if exists manager ;
drop table if exists manage ;
drop table if exists Picture_files;
drop table if exists Furnitures;


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
select house_name from property join own on property.PID=own.PID where own.OID = '323628';
select house_name from select house_name from property join own on property.PID=own.PID where own.OID ='323628'
select * from property;
select * from own;
select PID from property where house_name='sage';

INSERT INTO property (house_name,Address,
house_type,Monthly_rent,
bedroom,bathroom,parking,laundry,fenced_yard,Detached,Floor,
elevator,number_of_people,private_Kitchen,date_listed
)
VALUES ('334 Kingscourt Ave','334 Kingscourt Ave, # 1, Kingston, ON K7K 4R5',
'Apartment',2349,
3,1,true,'shared',false,'yes',0,
false,null,true,'2023-11-7');

INSERT INTO property (house_name,Address,
house_type,Monthly_rent,
bedroom,bathroom,parking,laundry,fenced_yard,Detached,Floor,
elevator,number_of_people,private_Kitchen,date_listed
)
VALUES ('631 Aylmer Cres','631 Aylmer Cres, # 2, Kingston, ON K7M 6K3',
'Apartment',1899,
2,1,true,'shared',true,'yes',0,
false,null,true,'2023-11-13');

INSERT INTO property (house_name,Address,
house_type,Monthly_rent,
bedroom,bathroom,parking,laundry,fenced_yard,Detached,Floor,
elevator,number_of_people,private_Kitchen,date_listed
)
VALUES ('136 Chatham St', '136 Chatham St, Kingston, ON K7K 4H4',
'Apartment',3000,
2,1,true,'ensuite',true,'yes',0,
false,null,true,'2024-1-12');

INSERT INTO property (house_name,Address,
house_type,Monthly_rent,
bedroom,bathroom,parking,laundry,fenced_yard,Detached,Floor,
elevator,number_of_people,private_Kitchen,date_listed
)
VALUES ('1145 Coverdale Dr', '1145 Coverdale Dr, Kingston, ON K7M 8X7',
'Apartment',3000,
3,1,true,'ensuite',true,'yes',0,
false,null,true,'2024-1-11');

INSERT INTO property (house_name,Address,
house_type,Monthly_rent,
bedroom,bathroom,parking,laundry,fenced_yard,Detached,Floor,
elevator,number_of_people,private_Kitchen,date_listed
)
VALUES ('139 Mowat Ave', '139 Mowat Ave, Kingston, ON K7M 1K5',
'Single Family Residence',2700,
3,1,true,'shared',true,'yes',0,
false,null,true,'2024-1-4');

select * from ownr;
CREATE TABLE ownr (
	OID varchar(255),
	Fname varchar(255),
	Lname varchar(255),
    PhoneNo varchar(255),
    Address varchar(255)
);

INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress)
VALUES ('QQ001', 'Rhenti','Sanchez','3432900940','none');
INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress)
VALUES ('QQ002', 'Rhenti','Sanchez','3432900940','none');
INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress)
VALUES ('QQ003', 'Nolan','Hubbard','6135835252','none');
INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress)
VALUES ('QQ004', 'Yan','Junchi','3659913859','1145 Coverdale Dr, Kingston, ON K7M 8X7');
INSERT INTO ownr (OID,Fname,Lname,PhoneNo,Adress)
VALUES ('QQ005', 'Zhang','Naifu','7789020800','139 Mowat Ave, Kingston, ON K7M 1K5');

select * from own;
create table own(
	PID int,
    OID varchar(255)
);
INSERT INTO own (PID,OID)
VALUES (1,'QQ001');
INSERT INTO own (PID,OID)
VALUES (2,'QQ002');
INSERT INTO own (PID,OID)
VALUES (3,'QQ003');
INSERT INTO own (PID,OID)
VALUES (4,'QQ004');
INSERT INTO own (PID,OID)
VALUES (5,'QQ005');

CREATE TABLE manager (
	PhoneNumber varchar(255),
	FName varchar(255),
	LName varchar(255)
);
INSERT INTO manager (PhoneNumber,Fname,Lname)
VALUES ('3658364726','Rick','Smith');
INSERT INTO manager (PhoneNumber,Fname,Lname)
VALUES ('7785382627','Jerry','Sanchez');

select * from manager;
INSERT INTO manage (PID,PhoneNumber,StartYear,EndDate) values ('20020425','3659927636','20020425','20240113');
select * from manage;
select house_name, property.PID from property join manage on property.PID=manage.PID where manage.PhoneNumber = '3659927636';
create table manage(
	house_name varchar(255),
    PhoneNumber varchar(255),
    StartYear varchar(255),
    EndDate varchar(255)
);

INSERT INTO manage (PID, PhoneNumbaer, StartYear, EndDate)
VALUES (1,'7785382627','2023-11-01','2025-09-08');
INSERT INTO manage (PID, PhoneNumbaer, StartYear, EndDate)
VALUES (2,'3658364726','2023-06-07','2025-12-11');
INSERT INTO manage (PID, PhoneNumbaer, StartYear, EndDate)
VALUES (3,'7785382627','2023-03-08','2025-11-09');
INSERT INTO manage (PID, PhoneNumbaer, StartYear, EndDate)
VALUES (4,'7785382627','2023-08-22','2025-06-23');
INSERT INTO manage (PID, PhoneNumbaer, StartYear, EndDate)
VALUES (5,'3658364726','2023-04-25','2025-07-11');

select * from Picture_files;
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
INSERT INTO Picture_files (PID,File_name
)
VALUES (1, 'p1_001.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (1, 'p1_002.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (1, 'p1_003.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (1, 'p1_004.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (1, 'p1_005.webp');

INSERT INTO Picture_files (PID,File_name
)
VALUES (2, 'p2_001.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (2, 'p2_002.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (2, 'p2_003.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (2, 'p2_004.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (2, 'p2_005.webp');

INSERT INTO Picture_files (PID,File_name
)
VALUES (3, 'p3_001.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (3, 'p3_002.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (3, 'p3_003.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (3, 'p3_004.webp');
INSERT INTO Picture_files (PID,File_name
)
VALUES (3, 'p3_005.webp');

INSERT INTO Picture_files (PID,File_name
)
VALUES (4, 'p4_001.png');
INSERT INTO Picture_files (PID,File_name
)
VALUES (4, 'p4_002.jpg');

INSERT INTO Picture_files (PID,File_name
)
VALUES (5, 'p5_001.png');
INSERT INTO Picture_files (PID,File_name
)
VALUES (5, 'p5_002.jpg');

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
select * from Furnitures;

INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (1, 'bed');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (2, 'bed');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (2, 'TV');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (2, 'table');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (2, 'chair');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (3, 'table');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (3, 'chair');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (3, 'dishwasher');
INSERT INTO Furnitures (PID,Furniture_name
)
VALUES (3, 'micro_wave');



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

drop table Rental_Group;
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

    
   

INSERT INTO property (house_name,Address, house_type,Monthly_rent,
bedroom,bathroom,
parking,laundry,fenced_yard,Detached,
Floor,elevator,number_of_people,private_Kitchen,date_listed) 
values ('sage kingston','unit 610-652 Princess Street, Kingston','apartment','1900',
'1','1',
true,'yes',false,'1',
'0',true,'0',true,'20020425');


INSERT INTO property (house_name,Address, house_type,Monthly_rent,bedroom,bathroom,parking,laundry,fenced_yard,Detached,floor,elevator,number_of_people,private_Kitchen,date_listed) 
values ('','','apartment','1900','1','1',true,'yes',false,'1','0',ture,'0',true,'20020425');


