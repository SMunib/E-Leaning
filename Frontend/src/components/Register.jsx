import React, { useState } from "react";
import '../styleSheets/Login.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
  // const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Set default to 'student'
  const [invalid, setInvalid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorMessage , setErrorMessage] = useState('');
  const navigate = useNavigate();

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform the registration logic if the form is valid
    try{
      const response = await fetch('http://localhost:2000/register',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({Email,Password,userType,confirmPassword}),
      });
      const data = await response.json();
      
      if(data.success){
        const email = data.data.email;
        navigate(`/register-details?userType=${userType}&email=${email}`);
      }else{
        console.log("Validation error",data.error);
        if(data.message === "validation error"){
          setErrors(data.error);
          setErrorMessage("");
          alert("validation Error");
        }else{
            setErrors("");
            setErrorMessage(data.message);
            alert(data.message);
        }
      }
    }catch(error){
      console.log('Error during Registeration: ',error);
      setInvalid(true);
    }
    // You might want to send them to a server, validate, etc.

  }

  return (
    <div className="login-page">
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Register</h1>
        {invalid && <div className="Error">
          <p>Error during Registration</p>
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
        <input
          type="Password"
          placeholder="Confirm Password"
          className="textbox"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {errorMessage  && (
        <div className="message-container" style = {{color:'red'}}>
          <p>{errorMessage}</p>
        </div>
      )}
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
        {/* <Link to={`/register-details?userType=${userType}`}> */}
          <button type="submit">Confirm</button>
        {/* </Link> */}
        <div className="footer">
          <h3>Already have an account? <Link to="/">Login</Link></h3>
        </div>
      </form>
    </div>
    </div>
  )
}
