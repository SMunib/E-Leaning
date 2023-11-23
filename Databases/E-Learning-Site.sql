CREATE TABLE `Videos`(
    `CourseID` VARCHAR(50) NOT NULL,
    `URL` VARCHAR(100) NOT NULL,
    `Completed` TINYINT(1) NOT NULL
);
ALTER TABLE
    `Videos` ADD UNIQUE `videos_url_unique`(`URL`);
CREATE TABLE `DiscussionForum`(
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `UserName` BIGINT NOT NULL,
    `CourseID` BIGINT NOT NULL,
    `Comment` TEXT NOT NULL,
    `TimeStamp` DATETIME NOT NULL
);
CREATE TABLE `Assignments`(
    `CourseID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `AssignmentID` VARCHAR(50) NOT NULL,
    `Completed` TINYINT(1) NOT NULL,
    `NoOfQuestions` BIGINT NOT NULL,
    `Percentage` DOUBLE(8, 2) NOT NULL,
    `IssueDate` DATE NOT NULL,
    `Deadline` DATE NOT NULL
);
CREATE TABLE `Student`(
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `FirstName` VARCHAR(50) NOT NULL,
    `LastName` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `UniversityName` VARCHAR(100) NULL,
    `Country` VARCHAR(50) NULL,
    `City` VARCHAR(50) NULL,
    `PostalCode` VARCHAR(15) NULL
);
ALTER TABLE
    `Student` ADD UNIQUE `student_email_unique`(`Email`);
CREATE TABLE `Courses`(
    `CourseID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `CourseName` VARCHAR(50) NOT NULL,
    `Duration` BIGINT NOT NULL,
    `InstructorName` VARCHAR(50) NOT NULL,
    `Modules` BIGINT NOT NULL,
    `TotalStudents` BIGINT NOT NULL,
    `TotalVids` BIGINT NOT NULL,
    `StudentID` BIGINT NOT NULL,
    `Grade` BIGINT NOT NULL,
    `Percentage` BIGINT NOT NULL
);
CREATE TABLE `Registration`(
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL
);
CREATE TABLE `Teacher`(
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `FirstName` VARCHAR(50) NOT NULL,
    `LastName` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Qualifications` VARCHAR(100) NOT NULL,
    `CourseName` VARCHAR(50) NOT NULL,
    `Country` VARCHAR(100) NULL,
    `City` VARCHAR(100) NULL,
    `PostalCode` VARCHAR(15) NULL,
    `AccountNo` BIGINT NOT NULL
);
ALTER TABLE
    `Teacher` ADD UNIQUE `teacher_email_unique`(`Email`);
ALTER TABLE
    `Teacher` ADD UNIQUE `teacher_accountno_unique`(`AccountNo`);
CREATE TABLE `Admin`(
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(50) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `StudentID` BIGINT NOT NULL,
    `TeacherID` BIGINT NOT NULL,
    `StudentEmail` VARCHAR(50) NOT NULL,
    `TeacherEmail` VARCHAR(50) NOT NULL,
    `CourseID` VARCHAR(50) NOT NULL
);
ALTER TABLE
    `Admin` ADD UNIQUE `admin_email_unique`(`Email`);
CREATE TABLE `Quizes`(
    `CourseID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `QuizID` BIGINT NOT NULL,
    `NoOfQuestions` BIGINT NOT NULL,
    `Percentage` BIGINT NOT NULL,
    `Completed` TINYINT(1) NOT NULL,
    `IssueDate` BIGINT NOT NULL,
    `Deadline` DATE NOT NULL
);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_email_foreign` FOREIGN KEY(`Email`) REFERENCES `Admin`(`TeacherEmail`);
ALTER TABLE
    `Assignments` ADD CONSTRAINT `assignments_courseid_foreign` FOREIGN KEY(`CourseID`) REFERENCES `Courses`(`CourseID`);
ALTER TABLE
    `Admin` ADD CONSTRAINT `admin_teacherid_foreign` FOREIGN KEY(`TeacherID`) REFERENCES `Teacher`(`ID`);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_email_foreign` FOREIGN KEY(`Email`) REFERENCES `Registration`(`Email`);
ALTER TABLE
    `Videos` ADD CONSTRAINT `videos_courseid_foreign` FOREIGN KEY(`CourseID`) REFERENCES `Courses`(`CourseID`);
ALTER TABLE
    `Admin` ADD CONSTRAINT `admin_courseid_foreign` FOREIGN KEY(`CourseID`) REFERENCES `Courses`(`CourseID`);
ALTER TABLE
    `Quizes` ADD CONSTRAINT `quizes_courseid_foreign` FOREIGN KEY(`CourseID`) REFERENCES `Courses`(`CourseID`);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_password_foreign` FOREIGN KEY(`Password`) REFERENCES `Registration`(`Password`);
ALTER TABLE
    `Student` ADD CONSTRAINT `student_password_foreign` FOREIGN KEY(`Password`) REFERENCES `Registration`(`Password`);
ALTER TABLE
    `Student` ADD CONSTRAINT `student_email_foreign` FOREIGN KEY(`Email`) REFERENCES `Registration`(`Email`);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_id_foreign` FOREIGN KEY(`ID`) REFERENCES `DiscussionForum`(`ID`);
ALTER TABLE
    `Registration` ADD CONSTRAINT `registration_id_foreign` FOREIGN KEY(`ID`) REFERENCES `Student`(`ID`);
ALTER TABLE
    `Admin` ADD CONSTRAINT `admin_studentid_foreign` FOREIGN KEY(`StudentID`) REFERENCES `Student`(`ID`);
ALTER TABLE
    `Student` ADD CONSTRAINT `student_email_foreign` FOREIGN KEY(`Email`) REFERENCES `Admin`(`StudentEmail`);
ALTER TABLE
    `DiscussionForum` ADD CONSTRAINT `discussionforum_courseid_foreign` FOREIGN KEY(`CourseID`) REFERENCES `Courses`(`CourseID`);
ALTER TABLE
    `Student` ADD CONSTRAINT `student_id_foreign` FOREIGN KEY(`ID`) REFERENCES `DiscussionForum`(`ID`);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_coursename_foreign` FOREIGN KEY(`CourseName`) REFERENCES `Courses`(`CourseName`);
ALTER TABLE
    `Registration` ADD CONSTRAINT `registration_id_foreign` FOREIGN KEY(`ID`) REFERENCES `Teacher`(`ID`);
ALTER TABLE
    `DiscussionForum` ADD CONSTRAINT `discussionforum_username_foreign` FOREIGN KEY(`UserName`) REFERENCES `Registration`(`Username`);
ALTER TABLE
    `Courses` ADD CONSTRAINT `courses_studentid_foreign` FOREIGN KEY(`StudentID`) REFERENCES `Student`(`ID`);
ALTER TABLE
    `Teacher` ADD CONSTRAINT `teacher_firstname_foreign` FOREIGN KEY(`FirstName`) REFERENCES `Courses`(`InstructorName`);