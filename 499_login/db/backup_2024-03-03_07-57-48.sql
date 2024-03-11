

CREATE TABLE `credentials` (
  `UID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password_` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `role_` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`UID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE `make_group` (
  `UID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `GID` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`UID`,`GID`) USING BTREE,
  KEY `GID` (`GID`) USING BTREE,
  CONSTRAINT `make_group_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `students` (`UID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `make_group_ibfk_2` FOREIGN KEY (`GID`) REFERENCES `rental_group` (`GID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `make_group` VALUES ('aa000', '0000
)INSERT INTO `make_group` VALUES ('aa001', '0000
)INSERT INTO `make_group` VALUES ('aa002', '0001
)INSERT INTO `make_group` VALUES ('aa003', '0001
)INSERT INTO `make_group` VALUES ('aa004', '0001
)

CREATE TABLE `manage` (
  `PID` int NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_year` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`PID`,`phone_number`) USING BTREE,
  KEY `phone_number` (`phone_number`) USING BTREE,
  CONSTRAINT `manage_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `manage_ibfk_2` FOREIGN KEY (`phone_number`) REFERENCES `manager` (`phone_number`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE `manager` (
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  PRIMARY KEY (`phone_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `manager` VALUES ('13012341234', '' , '' , '123456
)INSERT INTO `manager` VALUES ('130123412341', '' , '' , '123456
)

CREATE TABLE `own` (
  `PID` int NOT NULL,
  `OID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`PID`,`OID`) USING BTREE,
  KEY `OID` (`OID`) USING BTREE,
  CONSTRAINT `own_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `own_ibfk_2` FOREIGN KEY (`OID`) REFERENCES `owner` (`OID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE `owner` (
  `OID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`OID`) USING BTREE,
  UNIQUE KEY `phone_number` (`phone_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE `pictures` (
  `PID` int NOT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`PID`,`file_name`) USING BTREE,
  CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/422065609_2129267960757813_6523283802791891132_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/422615666_2129270637424212_4848413286391023737_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424589556_2129267987424477_5483036318190958751_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424660732_2129267984091144_6145162977533956175_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424660989_2129267957424480_289666872341173166_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424687299_2129267994091143_7047179514255385314_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424736058_2129267977424478_2610722601137708788_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424786516_2129267990757810_7085242218693598515_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424965808_2129267980757811_5299665170192949980_n.jpg
)INSERT INTO `pictures` VALUES ('1', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424990016_2129267997424476_6170454248064395425_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420537612_341553868787509_7541008154464351356_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420538353_341553955454167_1219281069889944169_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420539241_341553945454168_3488689691358054556_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420539590_341553988787497_5043197548815890386_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420539778_341553975454165_1857321005508351790_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420539781_341554048787491_3922784051304451867_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420540441_341554002120829_6367095456849384089_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420542874_341553865454176_6224725072827078646_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420563041_341554042120825_1184932731889740600_n.jpg
)INSERT INTO `pictures` VALUES ('2', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/42%20Beverley%20St/420956279_341553932120836_6510065877131399546_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/405506539_7206397782750245_3790921527991629855_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/410596409_24480086364968419_3265162272506884298_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/416996070_25577993245133194_1743908844713870305_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417028973_25668335872750715_4449124194916932334_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417084145_7249316455120623_6446019478767462285_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417084250_6992847394143525_9143039459607559308_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417125274_24767317229548693_3469006524305408163_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417159084_6787832141346575_3315687504344718260_n.jpg
)INSERT INTO `pictures` VALUES ('3', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417264501_6948240728623598_814383685964250920_n.jpg
)INSERT INTO `pictures` VALUES ('4', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/630%20Princess%20St/406925344_7073332062747614_1970589403061136666_n.jpg
)INSERT INTO `pictures` VALUES ('4', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/630%20Princess%20St/419600980_7389577927767799_4511443589162453861_n.jpg
)INSERT INTO `pictures` VALUES ('4', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/630%20Princess%20St/420536280_7014564711971368_7989907287922750493_n.jpg
)INSERT INTO `pictures` VALUES ('4', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/630%20Princess%20St/422227455_7215618161863603_5997401127060306447_n.jpg
)INSERT INTO `pictures` VALUES ('4', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/630%20Princess%20St/422693232_6778460868932277_5732882240215386565_n.jpg
)INSERT INTO `pictures` VALUES ('5', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/487%20Brock%20St/379718227_7309960195710540_1459522285989104945_n.jpg
)INSERT INTO `pictures` VALUES ('5', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/487%20Brock%20St/382483427_7111415975544483_3438644587236511192_n.jpg
)INSERT INTO `pictures` VALUES ('5', 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/487%20Brock%20St/385796637_6546613352102540_3582619407499888739_n.jpg
)

CREATE TABLE `property` (
  `PID` int NOT NULL AUTO_INCREMENT,
  `listing_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `house_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `monthly_rent` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` decimal(4,1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `laundry` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fenced_yard` tinyint(1) DEFAULT NULL,
  `detached_or_semi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `floor_number` int DEFAULT NULL,
  `elevator` tinyint(1) DEFAULT NULL,
  `number_of_offered_rooms` int DEFAULT NULL,
  `private_kitchen` tinyint(1) DEFAULT NULL,
  `furniture` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `date_listed` date DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`PID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

INSERT INTO `property` VALUES ('1', 'Brand new apartment', '39 Ellerbeck St, Kingston, ON K7L 4H5', 'Apartment', '6600', '6', '2.5', '0', 'In Unit', '' , '' , '2', '0', '6', '1', 'Bed frames, living room sofa, dining table, chairs', '2023-11-07', 'Available
)INSERT INTO `property` VALUES ('2', 'Cozy room across from the pier', '42 Beverley St, Unit #3, Kingston, ON K7L 3Y4', 'Single Family Residence', '1195', '4', '1.0', '1', 'In Unit', '0', 'Detached', '' , '' , '1', '1', 'Bed, desk', '2023-11-13', 'Available
)INSERT INTO `property` VALUES ('3', 'One bedroom near Victoria Hall', '163 Union St, Kingston, ON K7L 2P4', 'Single Family Residence', '1127', '8', '4.0', '1', 'Shared', '1', 'Detached', '' , '' , '1', '0', 'Bed, desk, chair, mini-dressers, corner couch, floor lamp, mini fridge', '2024-01-12', 'Available
)INSERT INTO `property` VALUES ('4', 'Newly renovated apartment', '630 Princess St, Kingston, ON K7L 1E3', 'Apartment', '2200', '2', '1.0', '1', 'In unit', '' , '' , '5', '1', '2', '1', 'None', '2024-01-11', 'Available
)INSERT INTO `property` VALUES ('5', 'Clean, modern, private room', '487 Brock St, Kingston, ON K7L 1T7', 'Townhouse', '750', '7', '3.0', '1', 'Shared', '0', 'Semi', '' , '' , '1', '0', 'Bed, desk, chair, dressers, nightstand, lamp', '2024-02-11', 'Available
)

CREATE TABLE `rental_agreement` (
  `PID` int NOT NULL,
  `GID` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sign_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `monthly_rent` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`PID`,`GID`) USING BTREE,
  KEY `GID` (`GID`) USING BTREE,
  CONSTRAINT `rental_agreement_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rental_agreement_ibfk_2` FOREIGN KEY (`GID`) REFERENCES `rental_group` (`GID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE `rental_group` (
  `GID` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `preferred_type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` decimal(4,1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `laundry` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `range_lower_bound` int DEFAULT NULL,
  `range_upper_bound` int DEFAULT NULL,
  `accessibility` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`GID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `rental_group` VALUES ('0000', 'apartment', '2', '2.0', '0', 'ensuite', '' , '' , '0
)INSERT INTO `rental_group` VALUES ('0001', 'house', '3', '1.0', '1', 'shared', '' , '' , '1
)

CREATE TABLE `students` (
  `UID` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `year_of_graduation` int DEFAULT NULL,
  `program` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`UID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `students` VALUES ('aa000', 'abc', 'ABC', '3433433433', '1 Sample Street, Kingston, ON', '20240213', '2024', 'Computing
)INSERT INTO `students` VALUES ('aa001', 'abd', 'ABD', '3433433434', '2 Sample Street, Kingston, ON', '20240214', '2025', 'Health Science
)INSERT INTO `students` VALUES ('aa002', 'abe', 'ABE', '3433433435', '3 Sample Street, Kingston, ON', '20240215', '2026', 'Commerce
)INSERT INTO `students` VALUES ('aa003', 'abf', 'ABF', '3433433436', '4 Sample Street, Kingston, ON', '20240216', '2028', 'Engineering
)INSERT INTO `students` VALUES ('aa004', 'abg', 'ABG', '3433433437', '5 Sample Street, Kingston, ON', '20240217', '2027', 'Nursing
)

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `username` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` VALUES ('1', '123', '123', '123', '123
)