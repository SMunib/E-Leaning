import React, { useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
// import validation from "./LoginValidation";

export default function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  // const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:2000/login',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({Email,Password,userType}),
      });
      const data = await response.json();
      if(data.success && data.message === "Login Successful"){
        localStorage.setItem("token",data.token);
       // console.log(localStorage.getItem("token"));
        navigate('/home')
      }else if(data.success && data.message === "admin"){
        //move to admin page
      }else{
        console.log("Validation Error: ", data.error)
        if(data.message !== "validation error"){
          setInvalid(true);
          setErrors("");
        }else{
          setErrors(data.error);
        }
      }
    }catch(error){
      console.log('Error during Login: ',error);
      setInvalid(true);
    }
    //navigate('/home');
  }
  

  return (
    <div className="login-page">
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Login</h1>
      {invalid && <div className="Error">
          <p>Email or Password does not match</p>
        </div>}
        <input
          type="Email"
          placeholder="Email"
          className="textbox"
          value={Email}
          onChange={handleEmailChange}
        />
        <span style={{ color: 'red' }}>{errors.Email}</span>
        <input
          type="Password"
          placeholder="Password"
          className="textbox"
          value={Password}
          onChange={handlePasswordChange}
        />
        <span style={{ color: 'red' }}>{errors.Password}</span>
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
          <label>
          Admin
          <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === 'admin'}
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
    </div>
  )
}
