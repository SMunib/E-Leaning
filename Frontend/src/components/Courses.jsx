import React, { useState, useEffect } from 'react';
import "./Courses.css";

const Courses = ({ setActiveOption }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
        const enrolledResponse = await fetch('https://api.example.com/enrolled-courses');
        const enrolledData = await enrolledResponse.json();

        // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
        const availableResponse = await fetch('https://api.example.com/available-courses');
        const availableData = await availableResponse.json();

        setEnrolledCourses(enrolledData.courses);
        setAvailableCourses(availableData.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once

  const handleCourseClick = (course) => {
    // Set the selected course
    setSelectedCourse(course);
  };

  const handleGoBack = () => {
    setSelectedCourse(null);
    setActiveOption(null);
  };

  return (
    <div className="courses">
      {selectedCourse ? (
        <div>
          <h2>{selectedCourse.title}</h2>
          <p>Course Details: {selectedCourse.details}</p>
          {/* Add more course details here */}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <div>
          <section>
            <h2>Enrolled Courses</h2>
            {loading ? (
              <p>Loading enrolled courses...</p>
            ) : enrolledCourses.length > 0 ? (
              <ul>
                {enrolledCourses.map((course) => (
                  <li key={course.id} onClick={() => handleCourseClick(course)}>
                    {course.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses enrolled yet.</p>
            )}
          </section>

          <section>
            <h2>Available Courses</h2>
            {loading ? (
              <p>Loading available courses...</p>
            ) : availableCourses.length > 0 ? (
              <ul>
                {availableCourses.map((course) => (
                  <li key={course.id} onClick={() => handleCourseClick(course)}>
                    {course.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available courses at the moment.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Courses;