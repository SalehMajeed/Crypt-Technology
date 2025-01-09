import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
// import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import fiftyFiftyImg from "../assets/fifty_fifty.png";
import audiencePoll from "../assets/audience_poll.png";
import expertLifeLine from "../assets/ask_the_expert.png";
import {
  Container,
  CardWrapper,
  Header,
  TimerCircle,
  Button,
  Footer,
} from "../FinaleCandidate/FinaleCandidate.style.jsx";
import SocketContext from "../../contexts/SocketContext.js";
const timerSound = new Audio("path-to-your-15s-sound.mp3");

function FinaleHost() {
  const { socket, data } = useContext(SocketContext);

  const [timer, setTimer] = useState(30);
  const [questions, setQuestions] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [winner, setWinner] = useState(null);

  console.log(data);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-finale-master");
    }
  }, [socket]);

  const handleStartQuiz = () => {
    socket.emit("start-finale-quiz");
  }

  const handleResetQuiz = () => {
    socket.emit("reset-finale-quiz");
  }

  const handleStartTimer = () => {
    socket.emit("start-finale-timer");
  }
  
  const handleStopTimer = () => {
    socket.emit("stop-finale-timer");
  }

  const moneyList = [
    { id: "1)", amount: "Rs. 500" },
    { id: "2)", amount: "Rs. 1,000" },
    { id: "3)", amount: "Rs. 2,000" },
    { id: "4)", amount: "Rs. 4,000" },
    { id: "5)", amount: "Rs. 7,000" },
    { id: "6)", amount: "Rs. 15,000" },
    { id: "7)", amount: "Rs. 21,000" },
  ].reverse();

  return (
    <Container>
      <CardWrapper>
        <div className="elementsDiv">
          <div className="quizElements">
          <div className="submitBtnDiv">
              <Button className="submit-btn" onClick={handleResetQuiz}>
                Reset Quiz
              </Button>
              <Button className="submit-btn" onClick={handleStartQuiz}>
                Start Quiz
              </Button>
              <Button className="submit-btn" onClick={handleStartTimer}>
                Start Timer
              </Button>
              <Button className="submit-btn" onClick={handleStopTimer}>
                Stop Timer
              </Button>
            </div>
            <Header>
              <TimerCircle>
                <h2>{timer}</h2>
              </TimerCircle>
            </Header>
            <div className="optionsDiv">
              <p>{questions.question || "Loading question..."}</p>
              {questions.options ? (
                <div className="options">
                  {Object.values(questions.options).map((el, index) => (
                    <Button
                      key={index}
                      onClick={() => setSelectedAnswer(el)}
                      className={selectedAnswer === el ? "selected" : ""}
                    >
                      {el}
                    </Button>
                  ))}
                </div>
              ) : (
                <p>No options available</p>
              )}
            </div>
          </div>
          <div className="sideBar">
            <div className="lifeLine">
              <span>
                <img src={fiftyFiftyImg} alt="fifty_fifty.png" />
              </span>
              <span>
                <img src={audiencePoll} alt="audience-poll" />
              </span>
              <span>
                <img
                  className="expertLifeLine"
                  src={expertLifeLine}
                  alt="expertLifeLine"
                />
              </span>
            </div>
            {moneyList.map((el) => {
              return (
                <>
                  <li>
                    <span className="indexOfPrice">{el.id}</span>
                    <span className="price">{el.amount}</span>
                  </li>
                </>
              );
            })}
          </div>
        </div>
        <Footer>{winner && <p>Winner: {winner}</p>}</Footer>
      </CardWrapper>
    </Container>
  );
}

export default FinaleHost;
