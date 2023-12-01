import React, { useState } from "react";
import "./Help.css";

const Help = () => {
  const [question, setQuestion] = useState("");

  // Function to handle the user's question input
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Function to submit the user's question to the system
  const submitQuestion = () => {
    console.log("User question submitted:", question);
    
    setQuestion("Your Question is submitted!\nThanks for Contacting Us ");
    setTimeout(() => {}, 1000);
    setQuestion("");
  };

  return (
    <div className="help">
      <h1>Help</h1>
      <p>Have a question? Ask us!</p>
      <textarea
        placeholder="Enter your question here"
        value={question}
        onChange={handleQuestionChange}
      ></textarea>
      <button onClick={submitQuestion}>Submit</button>
    </div>
  );
};

export default Help;
