import React from "react";
import '../styleSheets/Login.css'
import { Link } from 'react-router-dom';

export default function RegisterSuccess(){
    return(
        <div className="login-container">
            <img src="../images/loginImage1.png" alt="" />
            <form action="Login" className="loginForm">
                <img className="Logo" src="../images/1.png" alt="" />
                <h1 className="heading">Thank you for your submission</h1>
                <Link to="/">
                    <button type="button">Login</button>
                </Link>
            </form>
        </div>
    )
}