// Responses.js

import React, { useState, useEffect } from 'react';
import './Responses.css'; // You can create a Responses.css file for styling

const Responses = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Empty function to fetch answered questions from the database
  const fetchAnsweredQuestionsFromDB = async () => {
    // Replace the URL with your actual backend API endpoint for fetching answered questions
    try {
      const response = await fetch('YOUR_API_ENDPOINT_FOR_ANSWERED_QUESTIONS');
      const data = await response.json();
      setAnsweredQuestions(data.answeredQuestions);
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
            <li key={question.id}>
              <p>{question.text}</p>
              <p><strong>Admin's Answer:</strong> {question.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Responses;
