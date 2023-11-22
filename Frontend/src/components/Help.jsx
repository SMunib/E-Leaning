import React, { useState } from 'react';
import './styles.css';
const Help = () => {
  // State to manage user's question input
  const [question, setQuestion] = useState('');

  // Function to handle the user's question input
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Function to submit the user's question to the system
  const submitQuestion = () => {
    // You can perform any necessary actions here, such as sending the question to your backend for processing.
    // For simplicity, we'll just log the question for now.
    console.log('User question submitted:', question);

    // Optionally, you can clear the input field after submission.
    setQuestion('');
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