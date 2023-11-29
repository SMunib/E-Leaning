import React, { useState } from 'react';
import './styles.css';
import Navigation from './Navigation';
import Course from './Course';
import { Link } from 'react-router-dom';

//sample code change required just to run that is why entered
const Courses = () => {
  // Sample course data
  const userType = new URLSearchParams(location.search).get('userType');
  const coursesData = [
    { id: 1, imageUrl: '../images/loginImage1.png',
      title: 'Course 3', summary: 'this is course 3'},
      { id: 2, imageUrl: '../images/1.png',
      title: 'Course 4', summary: 'this is course 4'},
  ];
  const handleViewClick = (courseId) => {
    // Implement the logic to handle the click event, e.g., navigate to the course details page
    console.log(`View course clicked for course with id ${courseId}`);
  };

  return (
    <div className="courses">
      <h1>Available courses</h1>
      {coursesData.map((course) => (
        
        <Course
          key={course.id}
          imageUrl={course.imageUrl}
          courseName={course.title}
          summary={course.summary}
          onViewClick={() => handleViewClick(course.courseName)}
        />
      ))}
      {userType === "student" && <h1>Hello Student</h1>}
    </div>
  );
};

export default Courses;