import React, { useState, useEffect } from 'react';
import "./Courses.css";
import ReactPlayer from 'react-player'

const RegisteredCourses = ({  userType }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrls, setVideoUrls] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      
      if(userType === "teacher"){
      try {
        const token = localStorage.getItem('token');
        // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
        const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforteacher', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const enrolledData = await enrolledResponse.json();
        if (enrolledData.success) {
          setEnrolledCourses(enrolledData.data);
          console.log(enrolledData.data);
        } else { 
          // alert("error"); 
        }
        // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
        // const availableResponse = await fetch('http://localhost:2000/course/find', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   }
        // });
        // const availableData = await availableResponse.json();
        // if (availableData.success) {
        //   setAvailableCourses(availableData.data);
        //   // console.log(availableData.length);
        //   // console.log(availableData.success);
        // } else { alert("Error"); }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }else if(userType === "student"){
      try {
        const token = localStorage.getItem('token');
        // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
        const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforstudent', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const enrolledData = await enrolledResponse.json();
        if (enrolledData.success) {
          setEnrolledCourses(enrolledData.data);
          console.log(enrolledData.data);
        } else { 
          // alert("error"); 
        }
        // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
        // const availableResponse = await fetch('http://localhost:2000/course/find', {
        //   method: 'GET',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   }
        // });
        // const availableData = await availableResponse.json();
        // if (availableData.success) {
        //   setAvailableCourses(availableData.data);
        //   // console.log(availableData.length);
        //   // console.log(availableData.success);
        // } else { alert("Error"); }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once

  // useEffect(() => {
  //   // This effect will run when enrolledCourses changes
  //   if (enrolledCourses.length > 0) {
  //     console.log('Enrolled courses exist:', enrolledCourses);
  //   } else {
  //     console.log('No enrolled courses.');
  //   }
  // }, [enrolledCourses]);

  const handleCourseClick = (course) => {
    // Set the selected course
    setSelectedCourse(course);

    const videos = [ //where the urls are stored
    'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    'https://www.youtube.com/watch?v=7KDRqBpT8NA&ab_channel=JSSolutions',
    'https://www.youtube.com/watch?v=mHPno0osqzY',
    // Add more URLs as needed
  ];
    setVideoUrls(videos);
  };

  const handleGoBack = () => {
    setSelectedCourse(null);
    setActiveOption(null);
  };

  return (
    <div className="courses">
      {selectedCourse ? (
        <div>
          <h2>{selectedCourse.CourseName}</h2>
          <p>Course Details: {selectedCourse.details}</p>
          <p>Course Code: {selectedCourse.CourseID}</p>
          <p>Course Modules: {selectedCourse.modules} </p>
          <p>Course Duration: {selectedCourse.duration}</p>
          {typeof selectedCourse.modules === 'number' && selectedCourse.modules > 0 ? (
      <div>
        <h3>Course Modules:</h3>
        {/* Use a loop to generate the specified number of headings */}
        {[...Array(selectedCourse.modules)].map((_, index) => (
          <div key={index}>
            <h4>Module {index + 1}</h4>
            {/* <p>Module Number: {index+1}</p> */}
            <ReactPlayer url={videoUrls[index]} />
            <p>Quiz {index + 1}: </p>
            {/* Add more details for each module if needed */}
            {/* Additional module details go here */}
          </div>
        ))}
      </div>
    ) : (
      <p>No modules available for this course.</p>
    )}

          {/* Add more course details here */}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      ) : (
        <div>
          <section>
            <h2>Enrolled Courses</h2>
            {loading ? (
              <p>Loading enrolled courses...</p>
            ) : Object.keys(enrolledCourses).length > 0 ? (
              <ul>
                {enrolledCourses.map((course) => (
                  <li key={course.CourseID} onClick={() => handleCourseClick(course)}>
                    {course.C_Name}
                  </li>
                ))}
              </ul>
              
            ) : (
              <p>No courses enrolled yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default RegisteredCourses;
