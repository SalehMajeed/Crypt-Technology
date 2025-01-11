import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const joinId = searchParams.get("id");

  useEffect(() => {
    if (socket && socket?.connected === false) {
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
            const responseTime = currentTime - data.startTime;
            socket.emit("submit-response", {
              userId: socket.id,
              joinId,
              time: responseTime,
              ans: [],
            });
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

  useEffect(() => {
    setTimer(30);
    setSelectedAnswers([]);
  }, [data?.finalResults]);

  const handleSubmit = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    const currentTime = Date.now();
    console.log(data.startTime);
    const responseTime = currentTime - data.startTime;
    socket.emit("submit-response", {
      userId: socket.id,
      joinId,
      time: responseTime,
      ans: selectedAnswers,
    });
  };

  useEffect(() => {
    if (selectedAnswers.length >= 4) {
      handleSubmit();
    }
  }, [selectedAnswers]);
  const distributedQuestion = data?.distributedQuestion;
  console.log(data);

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
            {/* <div className="quizElements"> */}
            {/* <Pera>Candidate</Pera> */}
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
                {data.finalResults ? (
                  <div>
                    <ul>
                      {data.finalResults.map((eachResult, index) => (
                        <li key={index}>
                          {
                            <ul color={eachResult.isWinner ? "green" : "red"} className="winners">
                              <li>{eachResult.joinId}</li>
                              <li>
                                {(eachResult.time / 1000).toFixed(3)} Seconds
                              </li>
                            </ul>
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Question>{distributedQuestion.question}</Question>
                    <div>
                      {data.startTimer && (
                        <>
                          <div className="options">
                            {Object.entries(
                              distributedQuestion.options || {}
                            ).map(([key, value]) => (
                              <Button
                                key={key}
                                onClick={() => {
                                  setSelectedAnswers((prevState) => [
                                    ...prevState,
                                    { id: key, value },
                                  ]);
                                }}
                                disabled={selectedAnswers.some(
                                  (eachAns) => eachAns.id === key
                                )}
                              >
                                <span>{`${key})`}</span>
                                {value}
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* </div> */}
          </div>
        ) : (
          <Pera
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <img
              src="./kbc-logo-champian3.png"
              alt="KBC logo champian 3"
              style={{ width: "550px", height: "auto" }}
            />
          </Pera>
        )}
      </CardWrapper>
    </Container>
  );
};

export default Candidate;

// first 4 45sec
// after 4 90sec
// first 4 45sec
