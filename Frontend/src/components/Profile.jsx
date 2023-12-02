import React, { useState, useEffect } from "react";
import "./Profile.css";


//Token is used in place of id for searching

//had to update the API URL
const Profile = () => {
  // State to store user profile data
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from a database
    const fetchData = async () => {
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
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that useEffect runs only once,
  return (
    <div className="profile">
      <h1>Profile</h1>
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <div>
          <p>First Name: {profileData[0].FirstName}</p>
          <p>Last Name: {profileData[0].LastName}</p>
          <p>Email: {profileData[0].Email}</p>
          <p>Qualification: {profileData[0].Qualification}</p>
          <p>Account Number: {profileData[0].AccountNo}</p>
          <p>City: {profileData[0].City}</p>
          <p>Country: {profileData[0].Country}</p>
          <p>Postal Code: {profileData[0].PostalCode}</p>
        </div>
      ) : (
        <p>Error loading profile data</p>
      )}
    </div>
  );
};

export default Profile;
