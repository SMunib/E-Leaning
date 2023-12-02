import React, { useState } from "react";
import "./Help.css";

const Help = () => {
  const [Request, setRequest] = useState("");
  const [message, setMessage] = useState("");
  // Function to handle the user's Request input
  const handleRequestChange = (e) => {
    setRequest(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  // Function to submit the user's Request to the system
  const submitRequest = async () => {
    console.log(JSON.stringify({ Request }));
    try{
      const response = await fetch('http://localhost:2000/admin/Request',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({Request}),
      });
      const data = await response.json();
      if(data.success){
        setMessage(data.message);
        console.log("User Request submitted:", Request);
      }else{
        alert("error: ",+ data.message);
        setMessage("");
      }
    }catch(err){
      console.log('Server Error: ',err);
      alert("Catch Error");
    }
    // setRequest("Your Request is submitted!\nThanks for Contacting Us ");
    // setTimeout(() => {}, 1000);
    // setRequest("");
  };

  return (
    <div className="help">
      <h1>Help</h1>
      <p>Have a Question? Ask us!</p>
      <textarea
        placeholder="Enter your Question here"
        value={Request}
        onChange={handleRequestChange}
      ></textarea>
      <button onClick={submitRequest}>Submit</button>
      {message  && (
        <div className="message-container" style = {{color:'red'}}>
          <p>{message}</p>
          </div>)}
    </div>
  );
};

export default Help;
