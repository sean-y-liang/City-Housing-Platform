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


-- Insert pictures for properties
-- 39 Ellerbeck St
INSERT INTO pictures (PID, file_name)
VALUES
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424965808_2129267980757811_5299665170192949980_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/422065609_2129267960757813_6523283802791891132_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/422615666_2129270637424212_4848413286391023737_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424589556_2129267987424477_5483036318190958751_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424660732_2129267984091144_6145162977533956175_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424660989_2129267957424480_289666872341173166_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424687299_2129267994091143_7047179514255385314_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424736058_2129267977424478_2610722601137708788_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424786516_2129267990757810_7085242218693598515_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/pictures/39%20Ellerbeck%20St/424990016_2129267997424476_6170454248064395425_n.jpg');

-- 42 Beverley St, Unit #3
INSERT INTO pictures (PID, file_name)
VALUES
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420539590_341553988787497_5043197548815890386_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420537612_341553868787509_7541008154464351356_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420539778_341553975454165_1857321005508351790_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420538353_341553955454167_1219281069889944169_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420539241_341553945454168_3488689691358054556_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420539781_341554048787491_3922784051304451867_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420540441_341554002120829_6367095456849384089_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420542874_341553865454176_6224725072827078646_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420563041_341554042120825_1184932731889740600_n.jpg'),
(2, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/42%20Beverley%20St/420956279_341553932120836_6510065877131399546_n.jpg');


-- 163 Union St
INSERT INTO pictures (PID, file_name)
VALUES
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/405506539_7206397782750245_3790921527991629855_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/410596409_24480086364968419_3265162272506884298_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/416996070_25577993245133194_1743908844713870305_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417028973_25668335872750715_4449124194916932334_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417084145_7249316455120623_6446019478767462285_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417084250_6992847394143525_9143039459607559308_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417125274_24767317229548693_3469006524305408163_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417159084_6787832141346575_3315687504344718260_n.jpg'),
(3, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/163%20Union%20St/417264501_6948240728623598_814383685964250920_n.jpg');

-- 630 Princess St
INSERT INTO pictures (PID, file_name)
VALUES
(4, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/630%20Princess%20St/406925344_7073332062747614_1970589403061136666_n.jpg'),
(4, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/630%20Princess%20St/419600980_7389577927767799_4511443589162453861_n.jpg'),
(4, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/630%20Princess%20St/420536280_7014564711971368_7989907287922750493_n.jpg'),
(4, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/630%20Princess%20St/422227455_7215618161863603_5997401127060306447_n.jpg'),
(4, 'https://github.com/elaine-wu-02/CISC499_housing_P/blob/main/pictures/630%20Princess%20St/422693232_6778460868932277_5732882240215386565_n.jpg');

SELECT * FROM property;

INSERT INTO students VALUES
('aa000', 'abc', 'ABC', '3433433433', '1 Sample Street, Kingston, ON', 20240213, (STR_TO_DATE('20270501'), 'Program0'),
('aa001', 'abd', 'ABD', '3433433434', '2 Sample Street, Kingston, ON', 20240214, (STR_TO_DATE('20270501'), 'Program1'),
('aa002', 'abe', 'ABE', '3433433435', '3 Sample Street, Kingston, ON', 20240215, (STR_TO_DATE('20270501'), 'Program2'),
('aa003', 'abf', 'ABF', '3433433436', '4 Sample Street, Kingston, ON', 20240216, (STR_TO_DATE('20270501'), 'Program3'),
('aa004', 'abg', 'ABG', '3433433437', '5 Sample Street, Kingston, ON', 20240217, (STR_TO_DATE('20270501'), 'Program4');

UPDATE students SET first_name = 'bbc' WHERE UID = 'aa000';
UPDATE students SET last_name = 'bbd' WHERE UID = 'aa001';
UPDATE students SET phone = '3433433445' WHERE UID = 'aa002';
UPDATE students SET address = '3 Alter Street, Kingston, ON' WHERE UID = 'aa003';
UPDATE students SET student_id = '20240317' WHERE UID = 'aa004';

INSERT INTO rental_group VALUES
('0000', 'apartment', 2, 2, NO, 'ensuite', NULL, NULL, NO),
('0001', 'house', 3, 1, YES, 'shared', NULL, NULL, YES);

UPDATE rental_group SET bathrooms = 1 WHERE GID = '0000';
UPDATE rental_group SET accessibility = NO WHERE GID = '0001';

INSERT INTO make_group VALUES
('aa000', '0000'),
('aa001', '0000'),
('aa002', '0001'),
('aa003', '0001'),
('aa004', '0001');
