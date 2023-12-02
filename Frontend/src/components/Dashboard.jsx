import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// have to add API URLS and if want to add some info than add it in sections
const Dashboard = ({userType}) => {
  const [userName, setUserName] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      if(userType === "teacher"){ //fetch for teachers
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
          } else { alert("error"); }
          const userresponse = await fetch("http://localhost:2000/teacher/findspecific", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const userdata = await userresponse.json();
          if(userdata.success){
            setUserName(userdata.data);
            console.log(userdata.data);
            console.log(userName);
          }else{alert('error')};
          // // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
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
      if(userType === "student"){ //fetch for student
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
          } else { alert("error"); }
          const userresponse = await fetch("http://localhost:2000/student/findspecific", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const userdata = await userresponse.json();
          if(userdata.success){
            setUserName(userdata.data);
          }else{alert('error')};
          // Replace 'https://api.example.com/available-courses' with your actual API endpoint for fetching available courses
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once,
  return (
    <div className="dashboard">
      <h1
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #2e8b57",
        }}
      >
        {loading ? "Loading..." : userName ? `Hi ${userName[0].FirstName} ! Welcome to Knowledge Net` : "User Data not available"}
      </h1>

      <section>
            <h2>Enrolled Courses</h2>
            {loading ? (
              <p>Loading enrolled courses...</p>
            ) : Object.keys(enrolledCourses).length > 0 ? (
              <ul >
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

      {/* Add more sections and components for additional dashboard features */}
    </div>
  );
};

export default Dashboard;