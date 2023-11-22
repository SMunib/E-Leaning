import React from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';

export default function Login(){
    return(
        <div className="login-container">
            <img src="../images/loginImage1.png" alt="" />
            <form action="Login" className="loginForm">
                <img className="Logo" src="../images/1.png" alt="" />
                <h1 className="heading">Login</h1>
                <input type="email" placeholder="Email" className="textbox"/>
                <input type="password" placeholder="Password" className="textbox"/>
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