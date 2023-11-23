import React, { useState } from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Register() {
    const location = useLocation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userType = new URLSearchParams(location.search).get('userType');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        {/* <img className="Logo" src="../images/1.png" alt="" /> */}
        <h1 className="heading">Enter Details</h1>
        
        <input
          type="text"
          placeholder="First Name"
          className="textbox"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="textbox"
          value={email}
          onChange={handleEmailChange}
        />
        {userType === 'student' && (
        <input
          type="text"
          placeholder="University Name"
          className="textbox"
          value={password}
          onChange={handlePasswordChange}
        />
        )}
        {userType === 'teacher' && (
        <input
          type="text"
          placeholder="Qualification"
          className="textbox"
          value={password}
          onChange={handlePasswordChange}
        />
        )}
        {userType === 'teacher' && (
        <input
          type="text"
          placeholder="Acount Number"
          className="textbox"
          value={password}
          onChange={handlePasswordChange}
        />
        )}
        <input
          type="text"
          placeholder="City"
          className="textbox"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <input
          type="text"
          placeholder="Country"
          className="textbox"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="textbox"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Link to={`/`}>
          <button type="submit">Confirm</button>
        </Link>
        <div className="footer">
          <h3>Already have an account? <Link to="/">Login</Link></h3>
        </div>
      </form>
    </div>
  )
}
