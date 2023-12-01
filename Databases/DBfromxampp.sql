-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 05:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `Requests` varchar(255) DEFAULT NULL,
  `Responses` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseID` varchar(255) NOT NULL,
  `CourseName` varchar(100) DEFAULT NULL,
  `modules` int(11) DEFAULT NULL,
  `duration` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CourseID`, `CourseName`, `modules`, `duration`) VALUES
('CS-2001', 'PF', 3, '01:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `discussionforum`
--

CREATE TABLE `discussionforum` (
  `CourseID` varchar(255) NOT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Timestamp` datetime(6) DEFAULT NULL,
  `StudentID` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reg_course`
--

CREATE TABLE `reg_course` (
  `CourseID` varchar(255) NOT NULL,
  `TeacherID` int(255) DEFAULT NULL,
  `StudentID` int(45) DEFAULT NULL,
  `Grade` int(11) DEFAULT NULL,
  `C_Name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `reg_course`
--

INSERT INTO `reg_course` (`CourseID`, `TeacherID`, `StudentID`, `Grade`, `C_Name`) VALUES
('CS2001', 7, 23, 4, 'PF'),
('CS2003', NULL, NULL, NULL, 'Data Structures');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `StudentID` int(45) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UniversityName` varchar(45) DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `PostalCode` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`StudentID`, `FirstName`, `LastName`, `Email`, `Password`, `UniversityName`, `Country`, `City`, `PostalCode`) VALUES
(23, 'Munib', 'Rehman', 'munibrehman10@gmail.com', '$2a$10$LHTfujE1AgBi94Rr5yacu..EWsXIU.qbwyCmTPkRlKDgOUzMWuDVq', 'Fast', 'Pakistan', 'Karachi', '12345'),
(24, 'munib', 'rehman', 'munibrehman15@gmail.com', '$2a$10$JZkfNpiqQz8R0ph/OW.RP.ZP56H9okLJi6PE7twpGlMF6sYkdqpm6', 'fast', 'Canada', 'lahore', '12345'),
(25, 'Munib', 'Rehman', 'munibrehman1920@gmail.com', '$2a$10$uEXO1vHIeIxg7TwIDF60DuxNqhwfZSUGspHikN6PQK9ufbrzgOzXW', 'NUCES', 'Pakistan', 'Karachi', '12543'),
(26, 'dummy', 'test', 'dummy@gmail.com', '$2a$10$JB39iCpeNUT3tFPa7sGMxuGD69ELeeAFRE9OIIpaD.d4GNgo10yxK', 'fast', 'pakistan', 'karachi', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `TeacherID` int(255) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Qualification` varchar(45) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  `PostalCode` varchar(45) DEFAULT NULL,
  `AccountNo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`TeacherID`, `FirstName`, `LastName`, `Email`, `Password`, `Qualification`, `City`, `Country`, `PostalCode`, `AccountNo`) VALUES
(7, 'Munib', 'Rehman', 'munibrehman1920@gmail.com', '$2a$10$XnklM2GTx8Tj5bESDMaCQus8f76oj1M0xTC83o', NULL, 'Karachi', 'Pakistan', '12345', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `CourseID` varchar(255) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Completed` tinyint(1) DEFAULT NULL,
  `Uploaded_Vid` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`CourseID`) USING BTREE,
  ADD UNIQUE KEY `CourseID_idx` (`CourseID`),
  ADD UNIQUE KEY `CourseName_Idx` (`CourseName`);

--
-- Indexes for table `discussionforum`
--
ALTER TABLE `discussionforum`
  ADD PRIMARY KEY (`CourseID`,`StudentID`),
  ADD KEY `StudentID_idx` (`StudentID`);

--
-- Indexes for table `reg_course`
--
ALTER TABLE `reg_course`
  ADD PRIMARY KEY (`CourseID`) USING BTREE,
  ADD UNIQUE KEY `Identify_idx` (`CourseID`,`TeacherID`,`StudentID`),
  ADD KEY `InstructorID_idx` (`TeacherID`),
  ADD KEY `StudentID_idx` (`StudentID`) USING BTREE;

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`StudentID`) USING BTREE,
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`) USING BTREE,
  ADD UNIQUE KEY `StudentID_UNIQUE` (`StudentID`) USING BTREE;

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`TeacherID`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`) USING BTREE,
  ADD KEY `TeacherID_UNIQUE` (`TeacherID`) USING BTREE,
  ADD KEY `AccountNo_UNIQUE` (`AccountNo`) USING BTREE;

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`CourseID`),
  ADD UNIQUE KEY `CourseID_UNIQUE` (`CourseID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `StudentID` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `TeacherID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discussionforum`
--
ALTER TABLE `discussionforum`
  ADD CONSTRAINT `FK_Student` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  ADD CONSTRAINT `discussionforum_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `reg_course` (`CourseID`) ON DELETE NO ACTION;

--
-- Constraints for table `reg_course`
--
ALTER TABLE `reg_course`
  ADD CONSTRAINT `FK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  ADD CONSTRAINT `FK_TeacherID` FOREIGN KEY (`TeacherID`) REFERENCES `teacher` (`TeacherID`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `reg_course` (`CourseID`) ON DELETE NO ACTION;
COMMIT;
