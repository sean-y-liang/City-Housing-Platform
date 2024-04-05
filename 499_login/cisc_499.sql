-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:33066
-- Generation Time: Mar 25, 2024 at 02:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cisc_499`
--

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `UID` varchar(255) NOT NULL,
  `password_` varchar(255) DEFAULT NULL,
  `role_` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `make_group`
--

CREATE TABLE `make_group` (
  `UID` varchar(255) NOT NULL,
  `GID` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `make_group`
--

INSERT INTO `make_group` (`UID`, `GID`) VALUES
('aa000', '0000'),
('aa001', '0000');

-- --------------------------------------------------------

--
-- Table structure for table `manage`
--

CREATE TABLE `manage` (
  `PID` int(11) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `start_year` int(11) DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `phone_number` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`phone_number`, `first_name`, `last_name`, `password`) VALUES
('123123123', '111', '222', '12345678'),
('13012341234', NULL, NULL, '123456'),
('130123412341', NULL, NULL, '123456'),
('13012345555', NULL, NULL, '123456'),
('test', NULL, NULL, '123456');

-- --------------------------------------------------------

--
-- Table structure for table `own`
--

CREATE TABLE `own` (
  `PID` int(11) NOT NULL,
  `OID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `OID` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`OID`, `first_name`, `last_name`, `phone_number`, `address`) VALUES
('7', NULL, NULL, NULL, NULL),
('9', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `PID` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`PID`, `file_name`) VALUES
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/422065609_2129267960757813_6523283802791891132_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/422615666_2129270637424212_4848413286391023737_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424589556_2129267987424477_5483036318190958751_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424660732_2129267984091144_6145162977533956175_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424660989_2129267957424480_289666872341173166_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424687299_2129267994091143_7047179514255385314_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424736058_2129267977424478_2610722601137708788_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424786516_2129267990757810_7085242218693598515_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424965808_2129267980757811_5299665170192949980_n.jpg'),
(1, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/39%20Ellerbeck%20St/424990016_2129267997424476_6170454248064395425_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/405506539_7206397782750245_3790921527991629855_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/410596409_24480086364968419_3265162272506884298_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/416996070_25577993245133194_1743908844713870305_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417028973_25668335872750715_4449124194916932334_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417084145_7249316455120623_6446019478767462285_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417084250_6992847394143525_9143039459607559308_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417125274_24767317229548693_3469006524305408163_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417159084_6787832141346575_3315687504344718260_n.jpg'),
(3, 'https://raw.githubusercontent.com/elaine-wu-02/CISC499_housing_P/main/public/assets/property%20pictures/163%20Union%20St/417264501_6948240728623598_814383685964250920_n.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `PID` int(11) NOT NULL,
  `listing_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `house_type` varchar(255) DEFAULT NULL,
  `monthly_rent` int(11) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` decimal(4,1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `laundry` varchar(255) DEFAULT NULL,
  `fenced_yard` tinyint(1) DEFAULT NULL,
  `detached_or_semi` varchar(255) DEFAULT NULL,
  `floor_number` int(11) DEFAULT NULL,
  `elevator` tinyint(1) DEFAULT NULL,
  `number_of_offered_rooms` int(11) DEFAULT NULL,
  `private_kitchen` tinyint(1) DEFAULT NULL,
  `furniture` varchar(255) DEFAULT NULL,
  `date_listed` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`PID`, `listing_name`, `address`, `house_type`, `monthly_rent`, `bedrooms`, `bathrooms`, `parking`, `laundry`, `fenced_yard`, `detached_or_semi`, `floor_number`, `elevator`, `number_of_offered_rooms`, `private_kitchen`, `furniture`, `date_listed`, `status`, `user_id`) VALUES
(1, 'Brand new apartment', '39 Ellerbeck St, Kingston, ON K7L 4H5', 'house', 6600, 3, 1.0, 0, 'ensuite', NULL, NULL, 2, 0, 3, 1, 'Bed frames, living room sofa, dining table, chairs', '2023-11-07', 'Available', 7),
(3, 'One bedroom near Victoria Hall', '163 Union St, Kingston, ON K7L 2P4', 'apartment', 1127, 1, 1.0, 1, 'Shared', 1, 'Detached', NULL, NULL, 1, 0, 'Bed, desk, chair, mini-dressers, corner couch, floor lamp, mini fridge', '2024-01-12', 'Available', 9);

-- --------------------------------------------------------

--
-- Table structure for table `rental_agreement`
--

CREATE TABLE `rental_agreement` (
  `PID` int(11) NOT NULL,
  `GID` varchar(4) NOT NULL,
  `sign_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `monthly_rent` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rental_group`
--

CREATE TABLE `rental_group` (
  `GID` varchar(4) NOT NULL,
  `house_type` varchar(255) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` decimal(4,1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `laundry` varchar(255) DEFAULT NULL,
  `range_lower_bound` int(11) DEFAULT NULL,
  `range_upper_bound` int(11) DEFAULT NULL,
  `accessibility` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `rental_group`
--

INSERT INTO `rental_group` (`GID`, `house_type`, `bedrooms`, `bathrooms`, `parking`, `laundry`, `range_lower_bound`, `range_upper_bound`, `accessibility`) VALUES
('0000', 'apartment', 1, 1.0, 0, 'ensuite', NULL, NULL, 0),
('0001', 'house', 3, 1.0, 1, 'shared', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `UID` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `year_of_graduation` int(11) DEFAULT NULL,
  `program` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`UID`, `first_name`, `last_name`, `phone_number`, `address`, `student_id`, `year_of_graduation`, `program`) VALUES
('6', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('8', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('aa000', 'abc', 'ABC', '3433433433', '1 Sample Street, Kingston, ON', 20240213, 2024, 'Computing'),
('aa001', 'abd', 'ABD', '3433433434', '2 Sample Street, Kingston, ON', 20240214, 2025, 'Health Science');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(200) DEFAULT '',
  `password` varchar(200) DEFAULT '',
  `user_type` tinyint(1) DEFAULT 1 COMMENT '1=student,2=owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `user_type`) VALUES
(2, 'Andy', 'Alex', 'andyalex', '12345678', 1),
(3, '234', '234', '2342', '234234234234', 1),
(5, NULL, NULL, 'test', '123456', 1),
(6, NULL, NULL, 'test111', '1', 1),
(7, NULL, NULL, 'owner1', '123456', 2),
(8, NULL, NULL, 'student1', '12345678', 1),
(9, NULL, NULL, '12341234', '12341234', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`UID`) USING BTREE;

--
-- Indexes for table `make_group`
--
ALTER TABLE `make_group`
  ADD PRIMARY KEY (`UID`,`GID`) USING BTREE,
  ADD KEY `GID` (`GID`) USING BTREE;

--
-- Indexes for table `manage`
--
ALTER TABLE `manage`
  ADD PRIMARY KEY (`PID`,`phone_number`) USING BTREE,
  ADD KEY `phone_number` (`phone_number`) USING BTREE;

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`phone_number`) USING BTREE;

--
-- Indexes for table `own`
--
ALTER TABLE `own`
  ADD PRIMARY KEY (`PID`,`OID`) USING BTREE,
  ADD KEY `OID` (`OID`) USING BTREE;

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`OID`) USING BTREE,
  ADD UNIQUE KEY `phone_number` (`phone_number`) USING BTREE;

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`PID`,`file_name`) USING BTREE;

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`PID`) USING BTREE;

--
-- Indexes for table `rental_agreement`
--
ALTER TABLE `rental_agreement`
  ADD PRIMARY KEY (`PID`,`GID`) USING BTREE,
  ADD KEY `GID` (`GID`) USING BTREE;

--
-- Indexes for table `rental_group`
--
ALTER TABLE `rental_group`
  ADD PRIMARY KEY (`GID`) USING BTREE;

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`UID`) USING BTREE;

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `PID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `make_group`
--
ALTER TABLE `make_group`
  ADD CONSTRAINT `make_group_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `students` (`UID`),
  ADD CONSTRAINT `make_group_ibfk_2` FOREIGN KEY (`GID`) REFERENCES `rental_group` (`GID`);

--
-- Constraints for table `manage`
--
ALTER TABLE `manage`
  ADD CONSTRAINT `manage_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`),
  ADD CONSTRAINT `manage_ibfk_2` FOREIGN KEY (`phone_number`) REFERENCES `manager` (`phone_number`);

--
-- Constraints for table `own`
--
ALTER TABLE `own`
  ADD CONSTRAINT `own_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`),
  ADD CONSTRAINT `own_ibfk_2` FOREIGN KEY (`OID`) REFERENCES `owner` (`OID`);

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`);

--
-- Constraints for table `rental_agreement`
--
ALTER TABLE `rental_agreement`
  ADD CONSTRAINT `rental_agreement_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `property` (`PID`),
  ADD CONSTRAINT `rental_agreement_ibfk_2` FOREIGN KEY (`GID`) REFERENCES `rental_group` (`GID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
