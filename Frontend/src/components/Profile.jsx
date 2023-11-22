import React, { useState } from 'react';
import './styles.css';
const Profile = () => {
  // State for user profile data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    contact: '123-456-7890',
    id: '123456',
    education: '',
    skills: '',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to save education and skills
  const saveData = () => {
    // You can save this data to your backend here
    console.log('User data saved:', userData);
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={userData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={userData.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Education Level:</label>
          <input
            type="text"
            name="education"
            value={userData.education}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={userData.skills}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={saveData}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;