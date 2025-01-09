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
    if (data && data.startTimer && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;

            const currentTime = Date.now();
            const responseTime = Math.floor(currentTime - data.startTime);
            socket.emit("submit-response", {
              userId: socket.id,
              time: responseTime,
            });
            setTimer(30);
            setSelectedAnswers([]);
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

  const handleSubmit = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    const currentTime = Date.now();
    console.log(data.startTime);
    const responseTime = Math.floor((currentTime - data.startTime));
    socket.emit("submit-response", { userId: socket.id, time: responseTime, ans: selectedAnswers });
    setTimer(30);
    setSelectedAnswers([]);
  };

  useEffect(() => {
    if (selectedAnswers.length >= 4) {
      handleSubmit()
    }
  }, [selectedAnswers])
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
                  {data.finalResults ? <div>yes</div> : <div>
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
                                    setSelectedAnswers(prevState => [...prevState, { id: key, value }]);
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
                        </>
                      ) : (
                        <div>Please wait for the timer to start...</div>
                      )}
                    </div>
                  </div>}

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

// first 4 45sec
// after 4 90sec
// first 4 45sec