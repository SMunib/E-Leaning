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
        const response = await fetch("http://localhost:2000/teacher/findspecifc",{
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json',
          },
        });
        const data = await response.json();
        if(data.success){
          console.log(data.data);
          setProfileData(data.results);
        }else{
          console.log(data.message);
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
          <p>First Name: {profileData.FirstName}</p>
          <p>Last Name: {profileData.LastName}</p>
          <p>Email: {profileData.Email}</p>
          {/* <p>Qualifiction: {profileData.Qualification}</p> */}
          <p>City: {profileData.City}</p>
          <p>Country: {profileData.Country}</p>
          {/* Add additional profile information as needed */}
        </div>
      ) : (
        <p>Error loading profile data</p>
      )}
    </div>
  );
};

export default Profile;
