import React, { useState, useEffect } from "react";
import "./Profile.css";

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

        // Replace the URL with your actual backend API endpoint
        const response = await fetch("https://api.example.com/profile");
        const data = await response.json();

        setProfileData(data);
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
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone Number: {profileData.phonenumber}</p>
          <p>Qualifiction: {profleData.qualification}</p>
          {/* Add additional profile information as needed */}
        </div>
      ) : (
        <p>Error loading profile data</p>
      )}
    </div>
  );
};

export default Profile;
