import React, { useState } from "react";
import '../styleSheets/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default function Register() {
  const location = useLocation();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [errorMessage , setErrorMessage] = useState('');
  const [invalid, setInvalid] = useState(false);
  // const [Email, setEmail] = useState('');
  // const [Password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [City, setCity] = useState('');
  const [Country, setCountry] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [AccountNo, setAccountNo] = useState('');
  const [Qualification, setQualification] = useState('');
  const [UniversityName, setUniversityName] = useState('');
  // const [username,setUsername] = useState('');
  const navigate = useNavigate();
  const userType = new URLSearchParams(location.search).get('userType');
  const Email = new URLSearchParams(location.search).get('email');
  const [errors, setErrors] = useState([]);
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }
  const handleAccountNoChange =(e)=>{
    setAccountNo(e.target.value);
  }
  const handlePostalCodeChange = (e)=>{
    setPostalCode(e.target.value);
  }
  const handleQualificationChange = (e) =>{
    setQualification(e.target.value);
  }
  const handleUniversityNameChange =(e) =>{
    setUniversityName(e.target.value);
  }
  // console.log(Email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:2000/registerDetails',{
        method : 'PATCH',
        headers :{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({userType,Email,FirstName,LastName,City,Country,PostalCode,UniversityName,AccountNo,Qualification}),
      });
      const data = await response.json();
      if(data.success){
        setErrorMessage("");
        console.log('success');
        navigate('/');
      }else{
        if(data.message === "validation error"){
          setErrors(data.error);
          setErrorMessage("");
          alert("Validation Error");
        }else{
          setErrors("");
          setErrorMessage(data.message);
        }
      }
    }catch(error){
      console.log('Error during Registeration: ',error);
      setInvalid(true);
    }
  }

  return (
    <div className="login-page">
    <div className="login-container">
      <img src="../images/loginImage1.png" alt="" />
      <form onSubmit={handleSubmit} className="loginForm">
        <img className="Logo" src="../images/1.png" alt="" />
        <h1 className="heading">Enter Details</h1>
        {invalid && <div className="Error">
          <p>Error during Registeration</p>
        </div>}
        <input
          type="FirstName"
          placeholder="First Name"
          className="textbox"
          value={FirstName}
          onChange={handleFirstNameChange}
        />
        <span style={{ color: 'red' }}>{errors.FirstName}</span>
        <input
          type="LastName"
          placeholder="Last Name"
          className="textbox"
          value={LastName}
          onChange={handleLastNameChange}
        />
        <span style={{ color: 'red' }}>{errors.LastName}</span>
        {userType === 'student' && (
        <input
          type="UniversityName"
          placeholder="University Name"
          className="textbox"
          value={UniversityName}
          onChange={handleUniversityNameChange}
        />
        )}
        {userType === 'teacher' && (
        <input
          type="Qualification"
          placeholder="Qualification"
          className="textbox"
          value={Qualification}
          onChange={handleQualificationChange}
        />
        )}
        {userType === 'teacher' && (
        <input
          type="AccountNo"
          placeholder="Account Number"
          className="textbox"
          value={AccountNo}
          onChange={handleAccountNoChange}
        />
        )}
        <input
          type="City"
          placeholder="City"
          className="textbox"
          value={City}
          onChange={handleCityChange}
        />
        <span style={{ color: 'red' }}>{errors.City}</span>
        <input
          type="Country"
          placeholder="Country"
          className="textbox"
          value={Country}
          onChange={handleCountryChange}
        />
        <span style={{ color: 'red' }}>{errors.Country}</span>
        <input
          type="PostalCodde"
          placeholder="Postal Code"
          className="textbox"
          value={PostalCode}
          onChange={handlePostalCodeChange}
        />
        <span style={{ color: 'red' }}>{errors.PostalCode}</span>
        {errorMessage  && (
        <div className="message-container" style = {{color:'red'}}>
          <p>{errorMessage}</p>
        </div>
      )}
        {/* <Link to={`/`}> */}
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
