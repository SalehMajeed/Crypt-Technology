import React, { useState, useEffect, useContext, useRef } from "react";
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
  Logo,
  Button,
  Footer,
} from "../FinaleCandidate/FinaleCandidate.style.jsx";
import SocketContext from "../../contexts/SocketContext.js";
const timerSound = new Audio("../assets/tick-sound.mp3");

function FinaleHost() {
  const { socket, data } = useContext(SocketContext);

  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [winner, setWinner] = useState(null);
  const intervalRef = useRef(null);
  const indexRef = useRef(null);

  const moneyList = [
    { squenceId: 1, id: "1)", timer: 30, amount: "Rs. 500" },
    { squenceId: 2, id: "2)", timer: 30, amount: "Rs. 1,000" },
    { squenceId: 3, id: "3)", timer: 30, amount: "Rs. 2,000" },
    { squenceId: 4, id: "4)", timer: 45, amount: "Rs. 4,000" },
    { squenceId: 5, id: "5)", timer: 45, amount: "Rs. 8,000" },
    { squenceId: 6, id: "6)", timer: 60, amount: "Rs. 15,000" },
    { squenceId: 7, id: "7)", timer: 60, amount: "Rs. 21,000" },
  ].reverse();

  if (data && indexRef.current !== data?.questionIndex) {
    const currentIndex = 6 - data.questionIndex;
    setTimer(moneyList[currentIndex]?.timer);
    indexRef.current = data.questionIndex;
  }

  useEffect(() => {
    if (socket) {
      socket.emit("connect-finale-candidate");
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
  }, [data, socket]);

  return (
    <Container>
      <CardWrapper>
        <div className="elementsDiv">
          <div className="quizElements">
            <Header>
              <TimerCircle>
                <h2>{timer}</h2>
              </TimerCircle>
            </Header>
            {data && data.distributedQuestion[data.questionIndex]?.question ? (
              <div className="optionsDiv">
                <p>
                  {data.startQuiz
                    ? data.distributedQuestion[data.questionIndex].question
                    : "Loading question..."}
                </p>
                {data.showOptions &&
                data.distributedQuestion[data.questionIndex].options ? (
                  <div className="options">
                    {Object.keys(
                      data.distributedQuestion[data.questionIndex].options
                    ).map((currentKey, index) => {
                      let el =
                        data.distributedQuestion[data.questionIndex].options[
                          currentKey
                        ];
                      if (
                        data.startTimer === false &&
                        data.lifeLine.fiftyOnce &&
                        data.lifeLine.fifty === false &&
                        Object.keys(
                          data.distributedQuestion[data.questionIndex].fifty ||
                            {}
                        ).includes(currentKey)
                      ) {
                        console.log(data.lifeLine.fiftyOnce);
                        el = "50/50";
                      }
                      return (
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
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <img
                      src="./kbc-logo-champian3.png"
                      alt="KBC logo champian3"
                      style={{ width: "550px", height: "auto" }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="sideBar">
            <div className="lifeLine">
              <span className={`lifeline ${data?.lifeLine?.fifty ? "" : "used-lifeline"
                }`}>
                <img src={fiftyFiftyImg} alt="fifty_fifty.png" />
              </span>
              <span className={`lifeline ${data?.lifeLine?.audiencePaul ? "" : "used-lifeline"
                }`}>
                <img src={audiencePoll} alt="audience-poll" />
              </span>
              {data?.questionIndex === 3 && (
                <span>
                  <img
                    className="expertLifeLine"
                    src={expertLifeLine}
                    alt="expertLifeLine"
                  />
                </span>
              )}
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
