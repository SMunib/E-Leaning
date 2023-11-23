-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 02:44 AM
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
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseID` varchar(255) NOT NULL,
  `CourseName` varchar(45) NOT NULL,
  `Duration` int(11) NOT NULL,
  `TeacherID` varchar(255) NOT NULL,
  `Modules` int(11) NOT NULL,
  `TotalStudents` int(11) NOT NULL,
  `TotalVids` int(11) NOT NULL,
  `StudentID` varchar(45) NOT NULL,
  `Grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CourseID`, `CourseName`, `Duration`, `TeacherID`, `Modules`, `TotalStudents`, `TotalVids`, `StudentID`, `Grade`) VALUES
('CS2001', 'ProgrammingFundamentals', 60, 'T214557', 10, 30, 10, '21k4603', 0);

-- --------------------------------------------------------

--
-- Table structure for table `discussionforum`
--

CREATE TABLE `discussionforum` (
  `CourseID` varchar(255) NOT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Timestamp` datetime(6) DEFAULT NULL,
  `StudentID` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `discussionforum`
--

INSERT INTO `discussionforum` (`CourseID`, `Username`, `Comment`, `Timestamp`, `StudentID`) VALUES
('CS2001', 'Munib Rehman', '', '0000-00-00 00:00:00.000000', '21k4603');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `StudentID` varchar(45) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `UniversityName` varchar(45) DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `PostalCode` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`StudentID`, `FirstName`, `LastName`, `Email`, `Password`, `UniversityName`, `Country`, `City`, `PostalCode`) VALUES
('21k4603', 'Munib', 'Rehman', 'k214603@nu.edu.pk', 'Munib123', 'FAST', 'Pakistan', 'Karachi', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `TeacherID` varchar(255) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Qualification` varchar(45) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  `PostalCode` varchar(45) DEFAULT NULL,
  `AccountNo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`TeacherID`, `FirstName`, `LastName`, `Email`, `Password`, `Qualification`, `City`, `Country`, `PostalCode`, `AccountNo`) VALUES
('T214557', 'Aziz', 'Zinger', 'AzizZinger@nu.edu.pk', 'Zinger123', 'PHD', 'Karachi', 'Pakistan', '1234', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `CourseID` varchar(255) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Completed` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`CourseID`, `URL`, `Completed`) VALUES
('CS2001', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', 1);

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
  ADD PRIMARY KEY (`CourseID`,`StudentID`),
  ADD KEY `StudentID_idx` (`StudentID`),
  ADD KEY `InstructorID_idx` (`TeacherID`),
  ADD KEY `CourseID_idx` (`CourseID`) USING BTREE;

--
-- Indexes for table `discussionforum`
--
ALTER TABLE `discussionforum`
  ADD PRIMARY KEY (`CourseID`,`StudentID`),
  ADD KEY `StudentID_idx` (`StudentID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`StudentID`,`Email`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`) USING BTREE,
  ADD UNIQUE KEY `StudentID_UNIQUE` (`StudentID`) USING BTREE;

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`TeacherID`,`Email`),
  ADD KEY `TeacherID_UNIQUE` (`TeacherID`) USING BTREE,
  ADD KEY `Email_UNIQUE` (`Email`) USING BTREE,
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
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `teacher` (`TeacherID`) ON DELETE NO ACTION;

--
-- Constraints for table `discussionforum`
--
ALTER TABLE `discussionforum`
  ADD CONSTRAINT `FKDF_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `discussionforum_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE NO ACTION;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE NO ACTION;
COMMIT;
