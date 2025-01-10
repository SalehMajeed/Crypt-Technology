import React, { useState, useEffect, useContext, useRef } from "react";
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
import ticSound from "../assets/tick-sound.mp3";
import themeSound from "../assets/theme-audio.mp3";
import wrongSubmitSound from "../assets/wrong.mp3";
import correctSubmitSound from "../assets/correct.mp3";
import questionPlaySound from '../assets/play.mp3';

function FinaleHost() {
  const { socket, data } = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const [winner, setWinner] = useState(null);
  const intervalRef = useRef(null);
  const indexRef = useRef(null);
  const hanldeClickSound = useRef(new Audio(ticSound));
  const handleThemeSound = new Audio(themeSound);
  const handleWrongSound = new Audio(wrongSubmitSound);
  const handleCorrectSubmissionSound = new Audio(correctSubmitSound);
  const handleQuestionPlaySound = new Audio(questionPlaySound);

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
  }, [data, socket]);

  const handleStartQuiz = () => {
    handleQuestionPlaySound.play();
    socket.emit("start-finale-quiz");
  };

  const handleResetQuiz = () => {
    handleThemeSound.play();
    socket.emit("reset-finale-quiz");
  };

  const handleStartTimer = () => {
    hanldeClickSound.current.play();
    socket.emit("start-finale-timer");
  };

  const pauseTimer = () => {
    console.dir(hanldeClickSound);
    hanldeClickSound.current.pause()
    // hanldeClickSound.pause = true;
  }

  const handleStopTimer = (name) => {
    socket.emit("stop-finale-timer", { lifeline: name });
  };

  const handleSubmitClick = (selectedAns) => {
    hanldeClickSound.current.pause()
    socket.emit("submit-finale-ans", {
      userAns: selectedAns,
    });
  };

  const handleSubmitResponse = () => {
    socket.emit("submit-finale-response");
  };

  const handleNextQuestion = () => {
    handleQuestionPlaySound.play()
    socket.emit("finale-next-question");
  };

  const handleWinner = () => {
    handleCorrectSubmissionSound.play();
  }

  const handleLooser = () => {
    handleWrongSound.play();
  }

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
              <Button className="submit-btn" onClick={pauseTimer}>
                Stop Timer
              </Button>
              <Button className="submit-btn" onClick={handleNextQuestion}>
                Next Question
              </Button>
              <Button className="submit-btn" onClick={handleSubmitResponse}>
                submit ans
              </Button>
              
              <Button className="submit-btn" onClick={handleWinner}>
                play winner
              </Button>
              
              <Button className="submit-btn" onClick={handleLooser}>
                play looser
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
                            data.distributedQuestion[data.questionIndex]
                              .fifty || {}
                          ).includes(currentKey)
                        ) {
                          console.log(data.lifeLine.fiftyOnce);
                          el = "50/50";
                        }
                        return (
                          <Button
                            key={index}
                            onClick={() => handleSubmitClick(el)}
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
                  )}
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          {data && (
            <div className="sideBar">
              <div className="lifeLine">
                <span
                  className={`lifeline ${
                    data.lifeLine?.fifty ? "" : "used-lifeline"
                  }`}
                >
                  <img
                    src={fiftyFiftyImg}
                    alt="fifty_fifty.png"
                    onClick={() => handleStopTimer("fifty")}
                  />
                </span>
                <span
                  className={`lifeline ${
                    data.lifeLine?.audiencePaul ? "" : "used-lifeline"
                  }`}
                >
                  <img
                    src={audiencePoll}
                    alt="audience-poll"
                    onClick={() => handleStopTimer("audiencePaul")}
                  />
                </span>
                {data.questionIndex === 3 && (
                  <span
                    className={`lifeline ${
                      data.lifeLine?.askExpert ? "" : "used-lifeline"
                    }`}
                  >
                    <img
                      src={expertLifeLine}
                      alt="expertLifeLine"
                      onClick={() => handleStopTimer("askExpert")}
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
                          data?.questionIndex + 1 === el.squenceId
                            ? "black"
                            : ""
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
          )}
        </div>
        <Footer>{winner && <p>Winner: {winner}</p>}</Footer>
      </CardWrapper>
    </Container>
  );
}

export default FinaleHost;
