import React, { useState } from 'react';
import './styles.css';

//sample code change required just to run that is why entered
const Courses = () => {
  // Sample course data
  const coursesData = [
    { id: 1, title: 'Course 1' },
    { id: 2, title: 'Course 2' },
    { id: 3, title: 'Course 3' },
  ];

  return (
    <div className="courses">
      <h1>Courses</h1>
      <ul>
        {coursesData.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;