// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = () => {
    axios
      .get("https://your-flask-backend-url/api/question")
      .then((response) => {
        setQuestion(response.data.question);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  const handleMagic8BallClick = () => {
    // need to make onclick and have the magic 8ball shake
    const responses = ["Yes", "No", "Maybe", "Try again later", "Definitely"];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
  };

  const handleNextQuestionClick = () => {
    fetchQuestion();
    setResponse("");
  };

  return (
    <div className="App">
      <img src="/assets/Title.png" type="png" alt="Title Screen"></img>
      {/* Story Video Intro */}

      {/* Magic 8 Ball */}
      <div className="magic-8-ball" onClick={handleMagic8BallClick}>
        {/* Magic 8 Ball graphic */}
        {/* Implement shake animation using CSS */}
        {/* Display response inside the magic 8 ball */}
        {response && <div className="response">{response}</div>}
      </div>

      {/* Question Display */}
      <div className="question">{question}</div>

      {/* Next Question Button */}
      <button onClick={handleNextQuestionClick}>Next Question</button>
    </div>
  );
}

export default App;
