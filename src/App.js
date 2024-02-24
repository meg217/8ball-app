// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");

  const getNextQuestion = () => {
    axios
      .get("https://your-flask-backend-url/api/question")
      .then((response) => {
        setQuestion(response.data.question);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  return (
    <div className="App">
      <img
        class="Title_Image"
        src="assets/Title.png"
        type="img/png"
        alt="Title Screen"
      />
      <h1>8 Ball</h1>
      <button onClick={getNextQuestion}>Next Question</button>
      <div className="question">{question}</div>
      {/* Add 8 ball component with shake animation */}
    </div>
  );
}

export default App;
