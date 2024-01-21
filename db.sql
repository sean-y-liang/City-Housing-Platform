create database cisc499;
use cisc499;
drop table property;
CREATE TABLE property (
    PID int NOT NULL AUTO_INCREMENT primary key,
    house_name varchar(255),
    OID int,
    GID int,
    Manager_phone varchar(255),
    Address varchar(255),
	Address1 varchar(255),
	Address2 varchar(255),
	house_type varchar(255),
    Monthly_rent float,
    
    bedroom int,
    bathroom int,
    parking_No int,
    laundry varchar(255),
    fenced_yard bool,
	Detached varchar(255),
    
    elevator bool,
    bumber_of_people int,
    private_Kitchen bool,
    
    date_listed date
);


create table propertypic(
	picID int,
    PropertyID int,
    filename varchar(255)
);

create table lister(
	listerID int,
    passwd varchar(255)   
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
VALUES ('ON', 'Kingston', '631 Aylmer Cres','# 2','K7M 6K3');

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('ON', 'Kingston', '136 Chatham St','# 1','K7K 4H4');

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('ON', 'Kingston', '1145 Coverdale Dr','# 1','K7M 8X7');

INSERT INTO property (house_name,OID,GID,Manager_phone,Address,house_type,Monthly_rent,
bedroom,bathroom,parking_No,laundry,fenced_yard,Detached,
elevator,bumber_of_people,private_Kitchen,data_list)
VALUES ('ON', 'Kingston', '139 Mowat Ave,','# 1','K7M 1K5');

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




