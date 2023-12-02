import React, { useState, useEffect } from "react";
import "./Profile.css";


//Token is used in place of id for searching

//had to update the API URL
const Profile = ({userType}) => {
  // State to store user profile data
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from a database
    const fetchData = async () => {
      if(userType === "teacher"){
        try {
          // Start loading
          setLoading(true);
          const token = localStorage.getItem('token');
          console.log(token);
          // Replace the URL with your actual backend API endpoint
          // Changes here Aziz
          const response = await fetch("http://localhost:2000/teacher/findspecific", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (data.success) {
            // console.log(data.data);
            setProfileData(data.data);
          } else {
            // console.log(data.message);
            alert("Error in fetching data");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      }
      else if(userType === "student"){
        //fetch data for student here 
        //I tried copying the teacher code but changing the route from teacher to student but it wasn't working
      }
    };
    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once,
  return (
    <div className="profile">
      <h1>{userType} Profile</h1>
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <div>
          <p><b>First Name:</b> {profileData[0].FirstName}</p>
          <p><b>Last Name:</b> {profileData[0].LastName}</p>
          <p><b>Email:</b> {profileData[0].Email}</p>
          {userType === "teacher" && <p><b>Qualification:</b> {profileData[0].Qualification}</p>}
          {userType === "teacher" && <p><b>Account Number:</b> {profileData[0].AccountNo}</p>}
          {userType === "student" && <p><b>Qualification:</b> {profileData[0].UniversityName}</p>}
          <p><b>City:</b> {profileData[0].City}</p>
          <p><b>Country:</b> {profileData[0].Country}</p>
          <p><b>Postal Code:</b> {profileData[0].PostalCode}</p>
        </div>
      ) : (
        <p>Error loading profile data</p>
      )}
    </div>
  );
};

export default Profile;
