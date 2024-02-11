-- Create a new database and use it
CREATE DATABASE IF NOT EXISTS cisc_499;
USE cisc_499;

-- Drop tables if they exist to prevent errors
DROP TABLE IF EXISTS rental_agreement;
DROP TABLE IF EXISTS make_group;
DROP TABLE IF EXISTS pictures;
DROP TABLE IF EXISTS own;
DROP TABLE IF EXISTS manage;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS rental_group;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS property;

CREATE TABLE property (
    PID int NOT NULL AUTO_INCREMENT primary key,
    house_name varchar(255),
    address varchar(255),
    house_type varchar(255),
    monthly_rent decimal,
    bedrooms int,
    bathrooms decimal,
    parking bool,
    laundry varchar(255),
    fenced_yard bool,
    detached_or_semi varchar(255),
    floors int,
    elevator bool,
    number_of_people int,
    private_kitchen bool,
    furniture varchar(255),
    date_listed date,
    stats varchar(255) 
);

CREATE TABLE students (
    UID varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    phone_number varchar(255),
    address varchar(255),
    student_id int,
    year_of_graduation date,
    program varchar(255)
);

CREATE TABLE rental_group (
    GID varchar(4) PRIMARY KEY,
    preferred_type varchar(255),
    bedrooms int,
    bathrooms decimal,
    parking bool,
    laundry varchar(255),
    range_lower_bound int,
    range_upper_bound int,
    accessibility bool
);

CREATE TABLE credentials (
    UID varchar(255) PRIMARY KEY,
    password_ varchar(255),
    role_ varchar(255)
);

CREATE TABLE owner (
    OID varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    phone_number varchar(255) UNIQUE,
    address varchar(255)
);

CREATE TABLE manager (
    phone_number varchar(255) PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255)
);

CREATE TABLE manage (
    PID int,
    phone_number varchar(255),
    start_year date,
    end_date date,
    PRIMARY KEY (PID, phone_number),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (phone_number) REFERENCES manager (phone_number)
);

CREATE TABLE own (
    PID int,
    OID varchar(255),
    PRIMARY KEY (PID, OID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (OID) REFERENCES owner (OID)
);

CREATE TABLE pictures (
    PID int,
    file_name varchar(255),
    PRIMARY KEY (PID, file_name),
    FOREIGN KEY (PID) REFERENCES property (PID)
);

CREATE TABLE rental_agreement (
    PID int,
    GID varchar(4),
    sign_date date,
    end_date date,
    start_date date,
    monthly_rent decimal,
    PRIMARY KEY (PID, GID),
    FOREIGN KEY (PID) REFERENCES property (PID),
    FOREIGN KEY (GID) REFERENCES rental_group (GID)
);

CREATE TABLE make_group (
    UID varchar(255),
    GID varchar(4),
    PRIMARY KEY (UID, GID),
    FOREIGN KEY (UID) REFERENCES students (UID),
    FOREIGN KEY (GID) REFERENCES rental_group (GID)
);

INSERT INTO property (house_name, address, house_type, monthly_rent, bedrooms, bathrooms, parking, laundry, fenced_yard, detached_or_semi, elevator, number_of_people, private_kitchen, furniture, date_listed)
VALUES
('Brand new apartment', '39 Ellerbeck St, Kingston, ON K7L 4H5', 'Apartment', 6600, 6, 2, false, 'In Unit', false, 'Detached', false, 6, true, 'Bed frames, living room sofa, dining table, chairs', '2023-11-7'),
('Cozy room across from the pier', '42 Beverley St, Unit #3, Kingston, ON K7L 3Y4', 'Single Family Residence', 1195, 4, 1, true, 'In Unit', false, 'Detached', false, 1, true, 'Bed, desk', '2023-11-13'),
('One bedroom near Victoria Hall', '163 Union St, Kingston, ON K7L 2P4', 'Single Family Residence', 1127, 8, 4, true, 'Shared', true, 'Detached', false, 1, false, 'Bed, desk, chair, mini-dressers, corner couch, floor lamp, mini fridge', '2024-1-12'),
('Newly renovated apartment', '630 Princess St, Kingston, ON K7L 1E3', 'Apartment', 2200, 2, 1, true, 'In unit', false, 'Semi', true, 2, true, 'None', '2024-1-11'),
('Clean, modern, private room', '487 Brock St, Kingston, ON K7L 1T7', 'Townhouse', 750, 7, 3, true, 'Shared', false, 'Semi', false, 1, false, 'Bed, desk, chair, dressers, nightstand, lamp', '2024-2-11');
