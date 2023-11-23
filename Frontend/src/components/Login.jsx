import React, { useState } from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Now you can use the 'email' and 'password' variables as needed.
    console.log('Email:', email);
    console.log('Password:', password);
    // You might want to send them to a server, validate, etc.
  }

  return (
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Login</h1>
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
        <div className="options">
          <div className="RememberMe">
            <input type="checkbox" /><label>Remember me</label>
          </div>
          <Link to="/reset-pass">Forgot Password</Link>
        </div>
        <Link to="/home">
          <button type="submit">Login</button>
        </Link>
        <div className="footer">
          <h3>Don't have an account? <Link to="/register">Register</Link></h3>
        </div>
      </form>
    </div>
  )
}
