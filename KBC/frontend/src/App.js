/* eslint-disable no-unused-vars */
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import WinnerPage from "./Components/WinnerPage.jsx";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    socket.on("question", (data) => {
      if (data) {
        console.log("New question received:", data);
        setQuestion(data);
        setResult(null);
        setRole(null);
      } else {
        console.error("No question received from server.");
      }
    });

    socket.on("result", (data) => {
      setResult(data);
      if (data.firstResponder === socket.id) {
        setRole("winner");
      } else {
        setRole("loser");
      }
    });

    return () => {
      socket.off("question");
      socket.off("result");
    };
  }, []);

  function SubmitFunc() {
    if (answer.trim()) {
      socket.emit("answer", { answer });
      setAnswer("");
      setQuestion(null);
    }
  }

  function handleNextQuestion() {
    setQuestion(null);
    setResult(null);
    setRole(null);
    socket.emit("nextQuestion");
  }

  const displayComponent = () => {
    if (role === "winner") {
      return (
        <>
          <WinnerPage myResult={result} />
        </>
      );
    } else if (role === "loser") {
      return (
        <div>
          <h2>Better luck next time!</h2>
          <p>Winner: {result.firstResponder}</p>
          <p>Answer: {result.answer}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Real Time Quiz App</h1>
          {question ? (
            <div>
              <h2>{question}</h2>
              <input
                type="text"
                value={answer}
                id="ansBox"
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button onClick={SubmitFunc}>Submit</button>
            </div>
          ) : (
            <h2>Waiting for question...</h2>
          )}
        </div>
      );
    }
  };

  return <div className="mainContainer">{displayComponent()}</div>;
}

export default App;

