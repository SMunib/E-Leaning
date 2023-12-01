// Navigation.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Courses from './Courses';
import Profile from './Profile';
import AvailableCourses from './AvailableCourses'
import Dashboard from './Dashboard';
import Logout from './Logout';
import Help from './Help';

const Navigation = () => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <nav className="navigation">
        <div className='title'>
          <img src="../images/1.png" alt="" className='logo'/>
          <h1>KnowledgeNet</h1>
        </div>
        <ul>
          <li>
            <button
              className={selectedOption === "Dashboard" ? "active" : ""}
              onClick={() => handleOptionClick("Dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "Courses" ? "active" : ""}
              onClick={() => handleOptionClick("Courses")}
            >
              Registered Courses
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "AvailableCourses" ? "active" : ""}
              onClick={() => handleOptionClick("AvailableCourses")}
            >
              Available Courses
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "Help" ? "active" : ""}
              onClick={() => handleOptionClick("Help")}
            >
              Help
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "Profile" ? "active" : ""}
              onClick={() => handleOptionClick("Profile")}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "Logout" ? "active" : ""}
              onClick={() => handleOptionClick("Logout")}
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>

      <div className='choice'>
        {selectedOption === "Dashboard" && <Dashboard />}
        {selectedOption === "Courses" && <Courses />}
        {selectedOption === "Profile" && <Profile />}
        {selectedOption === "Help" && <Help />}
        {selectedOption === "Logout" && <Logout />}
        {selectedOption === "AvailableCourses" && <AvailableCourses />}
        {/* Add other conditions for different components */}
      </div>
    </div>
  );
};

export default Navigation;
