import React, { useState, useEffect } from 'react';
import "./Courses.css";
import ReactPlayer from 'react-player'

const Courses = ({ setActiveOption, userType }) => {
  // const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if(userType === "teacher"){
        try {
          const token = localStorage.getItem('token');
          // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
          // const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforteacher', {
          //   method: 'GET',
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //   }
          // });
          // const enrolledData = await enrolledResponse.json();
          // if (enrolledData.success) {
          //   setEnrolledCourses(enrolledData.data);
          //   console.log(enrolledData.data);
          // } else { alert("error"); }
  
          // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
          const availableResponse = await fetch('http://localhost:2000/course/find', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          const availableData = await availableResponse.json();
          if (availableData.success) {
            setAvailableCourses(availableData.data);
            // console.log(availableData.length);
            // console.log(availableData.success);
          } else { alert("Error"); }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
      else if(userType === "student"){
        try {
          const token = localStorage.getItem('token');
          // Replace 'https://api.example.com/enrolled-courses' with your actual API endpoint for fetching enrolled courses
          // const enrolledResponse = await fetch('http://localhost:2000/reg_course/findforstudent', {
          //   method: 'GET',
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //   }
          // });
          // const enrolledData = await enrolledResponse.json();
          // if (enrolledData.success) {
          //   setEnrolledCourses(enrolledData.data);
          //   console.log(enrolledData.data);
          // } else { alert("error"); }
  
          // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
          const availableResponse = await fetch('http://localhost:2000/course/find', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          const availableData = await availableResponse.json();
          if (availableData.success) {
            setAvailableCourses(availableData.data);
            // console.log(availableData.length);
            // console.log(availableData.success);
          } else { alert("Error"); }
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
  };

  const handleGoBack = () => {
    setSelectedCourse(null);
    setActiveOption(null);
  };
  const handleEnroll = async (id) => {
    if(userType === "teacher"){
      try{
        const token = localStorage.getItem('token');
        const Response = await fetch('http://localhost:2000/reg_course/findforteacher', {
            method: 'Post',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type':'application/json', 
            },
            body : JSON.stringify({id,userType}),
          });
          const data = await Response.json();
          if(data.success){
            console.log("Teacher Enrolled");
            alert('Enrollment Successful');
          }else{
            alert("Enrollment Failed: ",data.message);
          }
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }if(userType === "student"){
      try{
        const token = localStorage.getItem('token');
        const Response = await fetch('http://localhost:2000/reg_course/findforstudent', {
            method: 'Post',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type':'application/json', 
            },
            body : JSON.stringify({id,userType}),
          });
          const data = await Response.json();
          if(data.success){
            console.log("Student Enrolled");
            alert('Enrollment Successful');
          }else{
            alert("Enrollment Failed: ",data.message);
          }
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
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

          {/* Add more course details here */}
          <button onClick={handleGoBack}>Go Back</button>
          <button onClick={() => handleEnroll(selectedCourse.CourseID)}>Enroll</button>
        </div>
      ) : (
        <div>
          <section style={{color:'white'}}>
            <h2>Available Courses</h2>
            {loading ? (
              <p>Loading available courses...</p>
            ) : Object.keys(availableCourses).length > 0 ? (
              <ul>
                {availableCourses.map((course) => (
                  <li key={course.CourseID} onClick={() => handleCourseClick(course)}>
                    {course.CourseName}{" "}{course.CourseID}
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
