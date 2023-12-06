-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 11:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `munib`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateStudentInfo` (IN `p_StudentID` INT, IN `p_FirstName` VARCHAR(45), IN `p_LastName` VARCHAR(45), IN `p_Email` VARCHAR(45), IN `p_Password` VARCHAR(255), IN `p_UniversityName` VARCHAR(45), IN `p_Country` VARCHAR(45), IN `p_City` VARCHAR(45), IN `p_PostalCode` VARCHAR(45))   BEGIN
  START TRANSACTION;

  UPDATE student
  SET
    FirstName = p_FirstName,
    LastName = p_LastName,
    Email = p_Email,
    Password = p_Password,
    UniversityName = p_UniversityName,
    Country = p_Country,
    City = p_City,
    PostalCode = p_PostalCode
  WHERE
    StudentID = p_StudentID;

  COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateTeacherInfo` (IN `p_TeacherID` INT, IN `p_FirstName` VARCHAR(45), IN `p_LastName` VARCHAR(45), IN `p_Email` VARCHAR(45), IN `p_Password` VARCHAR(45), IN `p_Qualification` VARCHAR(45), IN `p_City` VARCHAR(45), IN `p_Country` VARCHAR(45), IN `p_PostalCode` VARCHAR(45), IN `p_AccountNo` VARCHAR(45))   BEGIN
  START TRANSACTION;

  UPDATE teacher
  SET
    FirstName = p_FirstName,
    LastName = p_LastName,
    Email = p_Email,
    Password = p_Password,
    Qualification = p_Qualification,
    City = p_City,
    Country = p_Country,
    PostalCode = p_PostalCode,
    AccountNo = p_AccountNo
  WHERE
    TeacherID = p_TeacherID;

  COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `Requests` text DEFAULT NULL,
  `Responses` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `Requests`, `Responses`) VALUES
(2, 'hellp me admin', 'no'),
(4, 'Can u help me Mr.Admin?', 'i will try');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseID` varchar(255) NOT NULL,
  `CourseName` varchar(100) DEFAULT NULL,
  `modules` int(11) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `AvailableSeats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CourseID`, `CourseName`, `modules`, `duration`, `AvailableSeats`) VALUES
('CS-2001', 'PF', 3, '01:00:00', 5),
('CS-2002', 'Data Structures', 5, '02:30:00', 5),
('CS-2005', 'OS', 2, '01:00:00', 4),
('CS-2006', 'Object Oriented Programming', 3, '01:30:00', 4),
('CS-2009', 'Software Analysis And Design', 3, '01:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `QuizID` int(11) NOT NULL,
  `quiz` text NOT NULL,
  `CourseID` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`QuizID`, `quiz`, `CourseID`, `status`) VALUES
(1, 'https://screenrant.com/best-historical-tv-series-imdb/', 'CS-2002', 0);

--
-- Triggers `quizzes`
--
DELIMITER $$
CREATE TRIGGER `after_update_quizzes` AFTER UPDATE ON `quizzes` FOR EACH ROW BEGIN
    DECLARE total_quizzes INT;
    DECLARE completed_quizzes INT;

    -- Get the total number of quizzes and completed quizzes for the course
    SELECT COUNT(*), SUM(status) INTO total_quizzes, completed_quizzes
    FROM quizzes
    WHERE CourseID = NEW.CourseID;

    -- Check if all quizzes are completed
    IF completed_quizzes = total_quizzes THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'All quizzes completed';
    END IF;
END
$$
DELIMITER ;

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
('CS-2001', 7, 25, NULL, 'PF');

--
-- Triggers `reg_course`
--
DELIMITER $$
CREATE TRIGGER `before_enroll_trigger` BEFORE INSERT ON `reg_course` FOR EACH ROW BEGIN
    DECLARE remaining_seats INT;

    -- Get the current AvailableSeats value
    SELECT AvailableSeats INTO remaining_seats
    FROM course
    WHERE CourseID = NEW.CourseID;

    -- Subtract 1 from AvailableSeats
    SET remaining_seats = remaining_seats - 1;

    -- Check if there are remaining seats
    IF remaining_seats >= 0 THEN
        -- Update the course table with the new AvailableSeats value
        UPDATE course
        SET AvailableSeats = remaining_seats
        WHERE CourseID = NEW.CourseID;
    ELSE
        -- Raise an error to prevent enrollment
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Enrollment failed. No more available seats for this course.';
    END IF;
END
$$
DELIMITER ;

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
  `VidID` int(11) NOT NULL,
  `CourseID` varchar(255) NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Triggers `videos`
--
DELIMITER $$
CREATE TRIGGER `after_update_video_status` AFTER UPDATE ON `videos` FOR EACH ROW BEGIN
    DECLARE total_videos INT;
    DECLARE completed_videos INT;

    -- Get the total number of videos and completed videos for the course
    SELECT COUNT(*), SUM(Status) INTO total_videos, completed_videos
    FROM videos
    WHERE CourseID = NEW.CourseID;

    -- Check if all videos are completed
    IF completed_videos = total_videos THEN
        UPDATE course SET CourseStatus = 'Completed' WHERE CourseID = NEW.CourseID;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'All videos completed';
    END IF;
END
$$
DELIMITER ;

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
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`QuizID`);

--
-- Indexes for table `reg_course`
--
ALTER TABLE `reg_course`
  ADD UNIQUE KEY `identifier` (`CourseID`,`TeacherID`,`StudentID`),
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
  ADD PRIMARY KEY (`VidID`),
  ADD KEY `FK_CourseIDasd` (`CourseID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `QuizID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `VidID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reg_course`
--
ALTER TABLE `reg_course`
  ADD CONSTRAINT `FK_CourseID22` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_StudentID` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TeacherID` FOREIGN KEY (`TeacherID`) REFERENCES `teacher` (`TeacherID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `reg_course` (`CourseID`) ON DELETE NO ACTION;
COMMIT;
