import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styleSheets/Login.css';

export default function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email: ", email, "Password", password);
    navigate('/'); 
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="../images/loginImage1.png" alt="" />
        <form onSubmit={handleSubmit} className="loginForm">
          <img className="Logo" src="../images/1.png" alt="" />
          <h1 className="heading">Reset Password</h1>
          <input type="email" placeholder="Email" className="textbox" value={email} onChange={handleEmailChange} />
          <input type="password" placeholder="New Password" className="textbox" value={password} onChange={handlePasswordChange} />
          <button type="submit">Confirm</button>
          <div className="footer">
            <h3>Already have an account? <Link to="/">Login</Link></h3>
          </div>
        </form>
      </div>
    </div>
  )
}
