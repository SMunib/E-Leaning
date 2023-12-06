// Responses.js
import React, { useState, useEffect } from 'react';
import './Responses.css'; // You can create a Responses.css file for styling

const Responses = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Empty function to fetch answered questions from the database
  const fetchAnsweredQuestionsFromDB = async () => {
    // Replace the URL with your actual backend API endpoint for fetching answered questions
    try {
      const response = await fetch('http://localhost:2000/admin/Response',{
        method:'Get',

      });
      const data = await response.json();
      if(data.success){
        setAnsweredQuestions(data.data);
      }else{
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error fetching answered questions:', error);
    }
  };

  useEffect(() => {
    // Fetch answered questions from the database when the component mounts
    fetchAnsweredQuestionsFromDB();
  }, []);

  return (
    <div className='responses-container'>
      <h2>Admin Responses</h2>
      {answeredQuestions.length === 0 ? (
        <p>No answered questions.</p>
      ) : (
        <ul>
          {answeredQuestions.map((question) => (
            <li key={question.ID}>
              <p>{question.Requests}</p>
              <p><strong>Admin's Answer:</strong> {question.Responses}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Responses;
