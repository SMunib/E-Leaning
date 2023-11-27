-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2023 at 01:18 AM
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
  `Duration` int(11) DEFAULT NULL,
  `TeacherID` int(255) NOT NULL,
  `Modules` int(11) NOT NULL,
  `StudentID` int(45) NOT NULL,
  `Grade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(1, NULL, NULL, 'munibrehman10@gmail.com', '$2a$10$qjqft8UA03YXI4fbVnHAR.N6fRvQaJeAmk3So4d5BftfCrg1A7Hc2', NULL, NULL, NULL, NULL),
(14, NULL, NULL, 'dummy2@gmail.com', '$2a$10$G0C5jd5suGAsKe15tNOWZebTI7/N5Rfr5OxJDg3vptLt1nLlBOC4a', NULL, NULL, NULL, NULL),
(15, NULL, NULL, 'dummy3@gmail.com', '$2a$10$N4M3cL9NnUlRBw7k1ARijuAIoKJO2yCWh4H0qLQ2J1A7CaiBiHHXO', NULL, NULL, NULL, NULL),
(16, NULL, NULL, 'dummy212@gmail.com', '$2a$10$dLQBLvXPG2SUNTFa1Z6JpuDfZ009SC/i7LE1wnfFbZPw1W69jGlki', NULL, NULL, NULL, NULL),
(17, NULL, NULL, 'dummy23@gmail.com', '$2a$10$wxkUa7p/bGniai64TYcOUOa4SZRrjwY.jXYhqqZmHkJlEi0tc0GCa', NULL, NULL, NULL, NULL),
(18, NULL, NULL, 'dummy7@gmail.com', '$2a$10$ERqWrsQPYHnoOX7EJe2IJetZrhMB8hSkTGWn.8Z.B8K61T4GK/vTe', NULL, NULL, NULL, NULL),
(19, NULL, NULL, 'd@g.c', '$2a$10$fNRtYfUJqXYR9iMXKfN1FOI.KXXTExBfzADRZ5/cUqnFB3vKo4TJ6', NULL, NULL, NULL, NULL),
(20, NULL, NULL, 'dummy9@gmail.com', '$2a$10$RekLf5EtQjYtrFsm9imOoOnKOhN4P2YXkwN.EfhXLpM9ZEYHNROwC', NULL, NULL, NULL, NULL),
(21, NULL, NULL, 'a@b.c', '$2a$10$vBGWB6wAlbGkMUjtwvq.JOxMUGmt5lbPkSdDzcUi3IAphfJuc5h8.', NULL, NULL, NULL, NULL),
(22, 'a', 'a', 'a@b.k', '$2a$10$2irSHMLJWEkvfF/9X6b/BuNgsUsOGQ0xLAmlkltkjRj4AEpLBP.rm', 'a', 'a', 'a', '123');

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
  ADD PRIMARY KEY (`CourseID`,`TeacherID`,`StudentID`) USING BTREE,
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
  MODIFY `StudentID` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `TeacherID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  ADD CONSTRAINT `FK_TeacherID` FOREIGN KEY (`TeacherID`) REFERENCES `teacher` (`TeacherID`);

--
-- Constraints for table `discussionforum`
--
ALTER TABLE `discussionforum`
  ADD CONSTRAINT `FK_Student` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  ADD CONSTRAINT `discussionforum_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE NO ACTION;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE NO ACTION;
COMMIT;
