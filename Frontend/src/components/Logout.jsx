import React from "react";
import "./Logout.css";

const Logout = () => {
  // Function to handle the logout action
  const handleLogout = () => {
    window.location.href = '/';
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
