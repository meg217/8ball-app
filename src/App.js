// App.js
import React, { useState, useEffect } from "react";
//import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [showStoryIntro, setShowStoryIntro] = useState(false);
  const [showGameScreen, setShowGameScreen] = useState(false);

  useEffect(() => {
    console.log("Question state:", question);
    fetchQuestion();
  }, []);

  const fetchQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/api/question")
      .then((response) => {
        console.log("Fetched question:", response.data.question);
        setQuestion(response.data.question);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  const handleMagic8BallClick = () => {
    const responses = ["Yes", "No", "Maybe", "Try again later", "Definitely"];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
  };

  const handleNextQuestionClick = () => {
    fetchQuestion();
    setResponse("");
  };

  const handleVideoEnd = () => {
    setShowGameScreen(true);
    setShowStoryIntro(false);
  };

  const handlePlayClick = () => {
    setShowStoryIntro(true);
  };
  const handleBackClick = () => {
    setShowStoryIntro(false);
  };

  {
    /*TITLE SCREEN*/
  }
  return (
    <div className="App">
      {showStoryIntro ? (
        <div class="container">
          {/* Story Video Intro content */}
          <video
            src="LastQuestionsofaDino.mp4"
            type="video/mp4"
            autoPlay
            onEnded={handleVideoEnd}
            controls={false}
          ></video>
          <button onClick={handleBackClick}>Main Menu</button>
        </div>
      ) : showGameScreen ? (
        <div class="game-screen">
          {/* Game screen content */}
          <h2>Game Screen</h2>
          <div class="container">
            <img src="Dino_Background.png"></img>
            <div class="absolute_container">
            <img src="Dino_Hands.png"></img>
            </div>
          <div class="questionContainer">
            <p> {question} </p>
          </div>
          <button onClick={handleMagic8BallClick}>Ask Magic 8 Ball</button>
          <div class="eightBallResponse">
            {response && <p>{response}</p>}
          </div>
          <button onClick={handleNextQuestionClick}>Next Question</button>
          </div>
        </div>
      ) : (
        <div class="container">
          {/* Title Screen */}
          <img
            class="Title_image"
            src="/assets/Title.png"
            type="png"
            alt="Title Screen"
          />
          {/* play button to start the story intro video */}
          <button class="Play" onClick={handlePlayClick}>
            PLAY
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
