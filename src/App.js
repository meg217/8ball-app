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
  const [isShaking, setIsShaking] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);

  useEffect(() => {
    console.log("Question state:", question);
    fetchQuestion();
    setIsButtonDisabled(false);
  }, []);

  const fetchQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/api/question")
      .then((response) => {
        console.log("Fetched question:", response.data.question);
        setQuestion(response.data.question);
        setShowTextInput(true);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  };

  const handleMagic8BallClick = () => {
    setIsButtonDisabled(true);
    const responses = ["Yes", "No", "Maybe", "Try again later", "Definitely"];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setIsShaking(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
      setIsShaking(false);
    }, 1000);
  };

  const handleNextQuestionClick = () => {
    fetchQuestion();
    setResponse("");
    document.getElementById("questionInput").value = question;
  };

  const handleVideoEnd = () => {
    setShowGameScreen(true);
    setShowStoryIntro(false);
  };

  const handlePlayClick = () => {
    setShowStoryIntro(true);
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
      // Trigger the click event of the submit button
      document.getElementById("Shake").click();
    }
  };

  {
    /*TITLE SCREEN*/
  }
  return (
    <div className="App">
      {showStoryIntro ? (
        <div>
          {/* pre-game story video */}
          <video
            src="./assets/Copy of LastQuestionsofaDino (1).mp4"
            type="video/mp4"
            autoPlay
            onEnded={handleVideoEnd}
            controls={false}
          ></video>
          {/*<button onClick={handleBackClick}>Main Menu</button>*/}
        </div>
      ) : showGameScreen ? (
        <div className="game-screen">
          {/* Game screen content */}
          <audio controls={false} volume={0.5} autoPlay loop>
            <source src="./assets/soundtrack.mp3" type="audio/mp3" />
          </audio>
          <div className="containerB">
            <div className="background_container">
              <img src="./Dino_Background.png" alt="Dino Background" />
            </div>
            <div className="absolute_container">
              <div className={`Dino_Hands ${isShaking ? "shaking" : ""}`}>
                <img src="./Dino_Hands.png" alt="Dino Hands" />
              </div>
              <div className="questionContainer">
                <div>
                  {showTextInput && (
                    <label>
                      Question:
                      <textarea
                        placeholder="Type your question here or generate a random question using the button below."
                        id="questionInput"
                        onKeyDown={handleKeyDown}
                      ></textarea>
                    </label>
                  )}
                </div>
                {/* <p>Question: {question}</p> */}
                <div class="two_questions">
                  <button
                    id="Shake"
                    className="Ask_Ball_Button"
                    onClick={handleMagic8BallClick}
                    disabled={isButtonDisabled}
                    style={{
                      backgroundColor: isButtonDisabled ? "gray" : "#007bff",
                    }}
                  >
                    Shake Magic 8-ball
                  </button>
                  <button
                    className="Random_Q_Button"
                    onClick={handleNextQuestionClick}
                  >
                    Randomize Question
                  </button>
                </div>
              </div>
              {response && (
                <div
                  className={`eightBallResponse ${isShaking ? "shaking" : ""}`}
                >
                  <p>{response}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="containerA">
          {/* Title screen */}
          <img
            class="Title_image"
            src="./assets/Title.png"
            type="png"
            alt="Title Screen"
          />
          <audio controls={false} volume={0.5} autoPlay loop>
            <source src="./assets/soundtrack.mp3" type="audio/mp3" />
          </audio>
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
