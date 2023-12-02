import React, { useState, useEffect } from "react";
import "./Dashboard.css";

// have to add API URLS and if want to add some info than add it in sections
const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Replace 'https://api.example.com/user'
        const userResponse = await fetch("http://localhost:2000/teacher/findspecific",{
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content Type':'application/json',
          },
        });
        const userData = await userResponse.json();
        if(userData.success){
          setUserName(userData.data);
        }else{
          alert("error");
        }
        // Replace 'https://api.example.com/enrolled-courses'
        const coursesResponse = await fetch(
          "http://localhost:2000/reg_course/findforteacher",{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${token}`,
            }
          }
        );
        const coursesData = await coursesResponse.json();
        if(coursesData.success){
          setEnrolledCourses(coursesData.data);
        }else{
          alert("error in courses");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
        {loading ? "Loading..." : userName ? `Hi ${userName.FirstName} ! Welcome to Knowledge Net` : "User Data not available"}
      </h1>

      <section>
        <h2>Enrolled Courses</h2>
        {loading ? (
          <p>Loading enrolled courses...</p>
        ) : enrolledCourses.length > 0 ? (
          <ul>
            {enrolledCourses.map((course) => (
              <li key={course.id}>{course.title}</li>
            ))}
          </ul>
        ) : (
          <p>
            No courses enrolled yet. Browse and enroll in courses to get
            started!
          </p>
        )}
      </section>

      {/* Add more sections and components for additional dashboard features */}
    </div>
  );
};

export default Dashboard;
