// Navigation.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Requests from './Requests';
import Responses from './Responses';
import Logout from './Logout';
//added here 
import AddCourse from "./AddCourse";

const AdminNav = ({userType}) => {
  const [selectedOption, setSelectedOption] = useState("Requests");

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
              className={selectedOption === "Requests" ? "active" : ""}
              onClick={() => handleOptionClick("Requests")}
            >
              Requests
            </button>
          </li>
          <li>
            <button
              className={selectedOption === "Responses" ? "active" : ""}
              onClick={() => handleOptionClick("Responses")}
            >
              Responses
            </button>
          </li>
          //added here
            <li>
            <button
              className={selectedOption === "AddCourse" ? "active" : ""}
              onClick={() => handleOptionClick("AddCourse")}
            >
              Add Course
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
        {selectedOption === "Requests" && <Requests/>}
        {selectedOption === "Responses" && <Responses/>}
        {selectedOption === "Logout" && <Logout/>}
        //added here
        {selectedOption === "AddCourse" && <AddCourse />}
        {/* Add other conditions for different components */}
      </div>
    </div>
  );
};

export default AdminNav;
