// Import the necessary dependencies
import React, { useState, useEffect } from 'react';
import './Requests.css';

const Requests = () => {
  const [questions, setQuestions] = useState([]);
  const [newAnswers, setNewAnswers] = useState([]);

  useEffect(() => {
    // Fetch questions from the database when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:2000/admin/Request',{
          method:'GET',
          headers:{
            'content':'application/json',
          }
        });
        const data = await response.json();
        // Assuming the response structure is an array of questions
        setQuestions(data.data);
        console.log(questions);
        // Initialize newAnswers array with empty strings for each question
        setNewAnswers(data.map(() => ''));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (questionId) => {
    try {
      // Get the answer for the current question
      const answer = newAnswers[questionId - 1];

      // Send a request to your backend to update the answer in the database
      const response = await fetch('http://localhost:2000/admin/giveResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, answer }),
      });

      const data = await response.json();

      // Update the list of questions after a successful answer submission
      if (data.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.RequestID === questionId ? { ...question, answer } : question
          )
        );
      } else {
        console.error('Failed to submit answer:', data.message);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const unansweredQuestions = questions.filter((question) => !question.Response);

  return (
    <div className='requests-container'>
      <h2>Admin Requests</h2>
      {unansweredQuestions.length === 0 ? (
        <p>No unanswered questions.</p>
      ) : (
        <ul>
          {unansweredQuestions.map((question) => (
            <li key={question.RequestID}>
              <p>{question.Request}</p>
              {question.Response ? (
                <p><strong>Admin's Answer:</strong> {question.Response}</p>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Type your answer"
                    value={newAnswers[question.RequestID - 1]}
                    onChange={(e) => {
                      const updatedAnswers = [...newAnswers];
                      updatedAnswers[question.RequestID - 1] = e.target.value;
                      setNewAnswers(updatedAnswers);
                    }}
                  />
                  <button onClick={() => handleAnswer(question.RequestID)}>Answer</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;
