import { useContext, useEffect, useState, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import {
  Container,
  Pera,
  Question,
  CardWrapper,
  TimerCircle,
  Header,
  Button,
} from "./Candidate.styles.js";

const Candidate = () => {
  const { socket, data } = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-candidate");
    }
  }, [socket]);

  useEffect(() => {
    if (data && data.startTimer) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);

            const currentTime = Date.now();
            const responseTime = Math.floor(currentTime - data.startTime);
            socket.emit("submit-response", {
              userId: socket.id,
              time: responseTime,
            });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [data, socket]);

  const handleSubmit = () => {
    const currentTime = Date.now();
    console.log(data.startTime);
    const responseTime = Math.floor((currentTime - data.startTime));
    clearInterval(intervalRef.current);
    socket.emit("submit-response", { userId: socket.id, time: responseTime, ans: selectedAnswers });
  };
  const distributedQuestion = data?.distributedQuestion;

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
            <div className="quizElements">
              <Pera>Candidate</Pera>
              {data.waitForMaster ? (
                <Pera>Waiting for the Master...</Pera>
              ) : (
                <div className="optionsDiv">
                  {data.startTimer ? (
                    <Header>
                      <TimerCircle>
                        <h2>{timer}</h2>
                      </TimerCircle>
                    </Header>
                  ) : (
                    ""
                  )}
                  <Question>{distributedQuestion.question}</Question>
                  <div>
                    {data.startTimer ? (
                      <>
                        <div className="options">
                          {Object.entries(distributedQuestion.options).map(
                            ([key, value]) => (
                              <Button
                                key={key}
                                onClick={() => {
                                  setSelectedAnswers(prevState => [...prevState, { id: key, value }])
                                }
                                }
                                disabled={selectedAnswers.some(eachAns => eachAns.id === key)}
                              >
                                <span>{`${key})`}</span>
                                {value}
                              </Button>
                            )
                          )}
                        </div>

                        <Button
                          className="submit-btn"
                          onClick={handleSubmit}
                          style={{ cursor: selectedAnswers.length < 4 ? "not-allowed" : '' }}
                          disabled={selectedAnswers.length < 4} >
                          Submit
                        </Button>
                      </>
                    ) : (
                      <div>Please wait for the timer to start...</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Pera>Loading...</Pera>
        )}
      </CardWrapper>
    </Container>
  );
};

export default Candidate;