import React, { useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
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

function FinaleHost() {
  const { socket, data } = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const [winner, setWinner] = useState(null);
  const intervalRef = useRef(null);
  const indexRef = useRef(null);

  // State to track used lifelines
  const [usedLifelines, setUsedLifelines] = useState({
    fiftyFifty: false,
    audiencePoll: false,
    askTheExpert: false,
  });

  if (data && indexRef.current !== data?.questionIndex) {
    setTimer(30);
    indexRef.current = data.questionIndex;
  }

  const handleLifelineClick = (lifeline) => {
    setUsedLifelines((prev) => ({
      ...prev,
      [lifeline]: true,
    }));
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connect-finale-master");
    }
  }, [socket]);

  useEffect(() => {
    if (data && data.startTimer && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setTimer(30);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [ data, socket]);

  const handleStartQuiz = () => {
    socket.emit("start-finale-quiz");
  };

  const handleResetQuiz = () => {
    setUsedLifelines({
      fiftyFifty: false,
      audiencePoll: false,
      askTheExpert: false,
    });
    socket.emit("reset-finale-quiz");
  };

  const handleStartTimer = () => {
    socket.emit("start-finale-timer");
  };

  const handleStopTimer = () => {
    socket.emit("stop-finale-timer");
  };

  const handleSubmitResponse = () => {
    socket.emit("submit-finale-response");
  };

  const handleNextQuestion = () => {
    socket.emit("finale-next-question");
  };

  const moneyList = [
    { squenceId: 1, id: "1)", amount: "Rs. 500" },
    { squenceId: 2, id: "2)", amount: "Rs. 1,000" },
    { squenceId: 3, id: "3)", amount: "Rs. 2,000" },
    { squenceId: 4, id: "4)", amount: "Rs. 4,000" },
    { squenceId: 5, id: "5)", amount: "Rs. 7,000" },
    { squenceId: 6, id: "6)", amount: "Rs. 15,000" },
    { squenceId: 7, id: "7)", amount: "Rs. 21,000" },
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
              <Button className="submit-btn" onClick={handleNextQuestion}>
                Next Question
              </Button>
              <Button className="submit-btn" onClick={handleSubmitResponse}>
                submit ans
              </Button>
            </div>
            <Header>
              <TimerCircle>
                <h2>{timer}</h2>
              </TimerCircle>
            </Header>
            {data && data.distributedQuestion[data.questionIndex]?.question ? (
              <div className="optionsDiv">
                <p>
                  {data.distributedQuestion[data.questionIndex].question ||
                    "Loading question..."}
                </p>
                {data.showOptions &&
                  data.distributedQuestion[data.questionIndex].options && (
                    <div className="options">
                      {Object.values(
                        data.distributedQuestion[data.questionIndex].options
                      ).map((el, index) => (
                        <Button
                          key={index}
                          className={`${
                            data.submittedQuestion === el
                              ? data.showResult
                                ? data.distributedQuestion[data.questionIndex]
                                    ?.correctAnswer === el
                                  ? "correct" 
                                  : "incorrect" 
                                : "selected"
                              : ""
                          } ${
                            data.showResult &&
                            data.distributedQuestion[data.questionIndex]
                              ?.correctAnswer === el
                              ? "correct" 
                              : ""
                          }`}
                        >
                          {el}
                        </Button>
                      ))}
                    </div>
                  )}
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="sideBar">
            <div className="lifeLine">
              <span
                className={`lifeline ${
                  usedLifelines.fiftyFifty ? "used-lifeline" : ""
                }`}
              >
                <img
                  src={fiftyFiftyImg}
                  alt="fifty_fifty.png"
                  onClick={() => handleLifelineClick("fiftyFifty")}
                />
              </span>
              <span
                className={`lifeline ${
                  usedLifelines.audiencePoll ? "used-lifeline" : ""
                }`}
              >
                <img
                  src={audiencePoll}
                  alt="audience-poll"
                  onClick={() => handleLifelineClick("audiencePoll")}
                />
              </span>
              <span
                className={`lifeline ${
                  usedLifelines.askTheExpert ? "used-lifeline" : ""
                }`}
              >
                <img
                  src={expertLifeLine}
                  alt="expertLifeLine"
                  onClick={() => handleLifelineClick("askTheExpert")}
                />
              </span>
            </div>
            {moneyList.map((el, index) => {
              return (
                <React.Fragment key={index}>
                  <li
                    style={{
                      backgroundColor: `${
                        data?.questionIndex + 1 === el.squenceId ? "black" : ""
                      } `,
                    }}
                  >
                    <span className="indexOfPrice">{el.id}</span>
                    <span className="price">{el.amount}</span>
                  </li>
                </React.Fragment>
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
