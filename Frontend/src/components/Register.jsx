import React from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';

export default function Register(){
    return(
        <div className="login-container">
            <img src="../images/loginImage1.png" alt="" />
            <form action="Login" className="loginForm">
            <img className="Logo" src="../images/1.png" alt="" />
                <h1 className="heading">Register</h1>
                <input type="text" placeholder="Username" className="textbox"/>
                <input type="email" placeholder="Email" className="textbox"/>
                <input type="password" placeholder="Password" className="textbox"/>
                <input type="password" placeholder="Confirm Password" className="textbox"/>
                <Link to="/register-success">
                    <button type="submit">Confirm</button>
                </Link>
                <div className="footer">
                    <h3>Already have an account? <Link to="/">Login</Link></h3>
                </div>
            </form>
        </div>
    )
}