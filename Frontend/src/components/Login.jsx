import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === "student") {
      // Perform student validation using email and password
      if (email === "student@example.com" && password === "studentpassword") {
        console.log('Student login successful');
        
        // Navigate to the student dashboard or perform other actions
        navigate("/home");
      } else {
        console.log('Invalid student credentials');
        setInvalid(true);
      }
    } else if (userType === "teacher") {
      // Perform teacher validation using teacher ID
    }
  }
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  }

  return (
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Login</h1>
      {invalid && <div className="Error">
          <p>Invalid credentials</p>
        </div>}
        <input
          type="email"
          placeholder="Email"
          className="textbox"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="textbox"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="radio">
        <label>
            Student
            <input
              type="radio"
              name="userType"
              value="student"
              checked={userType === 'student'}
              onChange={handleUserTypeChange}
            />
          </label>
          <label>
            Teacher
            <input
              type="radio"
              name="userType"
              value="teacher"
              checked={userType === 'teacher'}
              onChange={handleUserTypeChange}
            />
          </label>
        </div>
        <div className="options">
          <div className="RememberMe">
            <input type="checkbox" /><label>Remember me</label>
          </div>
          <Link to="/reset-pass">Forgot Password</Link>
        </div>
          <button type="submit">Login</button>
        <div className="footer">
          <h3>Don't have an account? <Link to="/register">Register</Link></h3>
        </div>
      </form>
    </div>
  )
}
