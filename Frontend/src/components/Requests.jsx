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
        if(data.success){
          setQuestions(data.data);
          setNewAnswers(data.data.map(() => ''));
          console.log(data.data);
        } 
        // Assuming the response structure is an array of questions
        // console.log(questions);
        // Initialize newAnswers array with empty strings for each questio
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (questionId) => {
    // console.log(questionId);
    try {
      // Get the answer for the current question
      const answer = newAnswers[questionId - 1];

      // Send a request to your backend to update the answer in the database
      const response = await fetch('http://localhost:2000/admin/Response', {
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
            <li key={question.ID}>
              <p>{question.Requests}</p>
              {question.Responses ? (
                <p><strong>Admin's Answer:</strong> {question.Responses}</p>
              ) : (
                <div>
                  <input
                    type="text"
                    placeholder="Type your answer"
                    value={newAnswers[question.ID - 1]}
                    onChange={(e) => {
                      const updatedAnswers = [...newAnswers];
                      updatedAnswers[question.ID - 1] = e.target.value;
                      setNewAnswers(updatedAnswers);
                    }}
                  />
                  <button onClick={() => handleAnswer(question.ID)}>Answer</button>
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
