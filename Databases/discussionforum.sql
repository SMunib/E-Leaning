ALTER TABLE `discussionforum`
  ADD CONSTRAINT `FK_Student` FOREIGN KEY (`StudentID`) REFERENCES `student` (`StudentID`),
  ADD CONSTRAINT `discussionforum_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `reg_course` (`CourseID`) ON DELETE NO ACTION;

ALTER TABLE `discussionforum`
  ADD PRIMARY KEY (`CourseID`,`StudentID`),
  ADD KEY `StudentID_idx` (`StudentID`);

CREATE TABLE `discussionforum` (
  `CourseID` varchar(255) NOT NULL,
  `Username` varchar(45) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  `Timestamp` datetime(6) DEFAULT NULL,
  `StudentID` int(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
