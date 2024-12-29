import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CardWrapper,
  Header,
  TimerCircle,
  Button,
  Footer,
} from "./Live.styles";

const socket = io("http://localhost:3001");

function App() {
  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState({});
  const [Qid, setQId] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      const responseTime = 30 - timer; // Calculate response time
      socket.emit("answer", { answer: selectedAnswer, timeTaken: responseTime });
      setSelectedAnswer(null); // Reset the selected answer
    } else {
      alert("Please select an answer before submitting!");
    }
  };

  // Timer Countdown Logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(countdown);
          // Notify server that time is up
          socket.emit("timeUp", { Qid, socketId: socket.id });
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [Qid]);

  // Handle server events for quiz result and winner declaration
  useEffect(() => {
    socket.on("quizResult", (data) => {
      console.log("Quiz result received:", data);

      if (data.status === "correct" && data.socketId === socket.id) {
        console.log("Correct answer submitted.");
      } else if (data.status === "incorrect" && data.socketId === socket.id) {
        console.log("Incorrect answer submitted. Redirecting to loser page...");
        navigate("/loser"); // Redirect to loser page
        socket.disconnect(); // Disconnect loser
      }
    });

    socket.on("winner", (userId) => {
      console.log("Winner is:", userId);
      setWinner(userId);

      if (userId === socket.id) {
        console.log("You are the winner!");
        navigate("/winner", { state: { winner: userId } }); // Redirect to winner page
      } else {
        console.log("You are not the winner. Disconnecting...");
        socket.disconnect(); // Disconnect all non-winners
      }
    });

    return () => {
      socket.off("quizResult");
      socket.off("winner");
    };
  }, [navigate]);

  // Fetch current question
  useEffect(() => {
    socket.emit("question", Qid);

    const handleCurrentQuestion = (data) => {
      console.log("Received question data:", data);
      setQuestions(data || {});
    };

    socket.on("currentQuestion", handleCurrentQuestion);

    return () => {
      socket.off("currentQuestion", handleCurrentQuestion);
    };
  }, [Qid]);

  return (
    <Container>
      <CardWrapper>
        <Header>
          <p>Fastest Fingers First Question</p>
          <h6>PLAYING FOR</h6>
          <TimerCircle>
            <h2>{timer}</h2>
          </TimerCircle>
        </Header>
        <div>
          <p>{questions.question || "Loading question..."}</p>
          {questions.options ? (
            <div>
              {Object.values(questions.options).map((el, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedAnswer(el)}
                  style={{
                    backgroundColor:
                      selectedAnswer === el ? "lightblue" : "white",
                  }}
                >
                  {el}
                </Button>
              ))}
              <button onClick={handleSubmitAnswer}>Submit</button>
            </div>
          ) : (
            <p>No options available</p>
          )}
        </div>
        <Footer>{winner && <p>Winner: {winner}</p>}</Footer>
      </CardWrapper>
    </Container>
  );
}

export default App;
