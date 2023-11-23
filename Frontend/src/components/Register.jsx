import React, { useState } from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';

<<<<<<< HEAD
export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Set default to 'student'

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
    // Perform the registration logic if the form is valid
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('User Type:', userType);
    // You might want to send them to a server, validate, etc.
  }

  return (
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Register</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="textbox"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
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
=======
export default function Register(){
    return(
        <div className="login-container">
            <img src="../images/loginImage1.png" alt="" />
            <form action="Login" className="loginForm">
            <img className="Logo" src="../images/1.png" alt="" />
                <h1 className="heading">Register</h1>
                <input type="name" placeholder="Username" className="textbox"/>
                <input type="email" placeholder="Email" className="textbox"/>
                <input type="password" placeholder="Password" className="textbox"/>
                <input type="password" placeholder="Confirm_Password" className="textbox"/>
                <Link to="/register-success">
                    <button type="submit">Confirm</button>
                </Link>
                <div className="footer">
                    <h3>Already have an account? <Link to="/">Login</Link></h3>
                </div>
            </form>
>>>>>>> 37406c875ca852b34b14200a5911fa7fd3cc5bb7
        </div>
        <Link to={`/register-details?userType=${userType}`}>
          <button type="submit">Confirm</button>
        </Link>
        <div className="footer">
          <h3>Already have an account? <Link to="/">Login</Link></h3>
        </div>
      </form>
    </div>
  )
}
