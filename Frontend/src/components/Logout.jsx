import React from 'react';
import './styles.css';

const Logout = () => {
  // Function to handle the logout action
  const handleLogout = () => {
    // give location after logut
   // window.location.href = '/login'; // add page where you want it to go after logout

   // window.location.href = '/login'; // Replace '/login' with your actual login route.
  };

  return (
    <div className="logout">
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;