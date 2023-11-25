// Course.js

import React from 'react';
import './Course.css';

const Course = ({ imageUrl, courseName, summary,teacherName, onViewClick }) => {
  return (
    <div className="course-box">
      <img src={imageUrl} alt={`Course: ${courseName}`} className="course-image" />
      <div className="course-details">
        <h2 className="course-name">{courseName}</h2>
        <p className="course-summary">{summary}</p>
        <p className="course-summary">Teacher Name: {teacherName}</p>
        <button className="view-button" onClick={onViewClick}>
          View Course
        </button>
      </div>
    </div>
  );
};

export default Course;
