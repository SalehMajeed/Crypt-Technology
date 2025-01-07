import { useContext, useEffect, useState } from "react";
import SocketContext from "../../contexts/SocketContext";
import {
  Container,
  Pera,
  Question,
  CardWrapper,
  Button,
  TimerCircle,
  Header,
} from "./Live.styles";

const Live = () => {
  const { socket, data } = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (socket) {
      socket.emit("connect-live");
    }
  }, [socket]);

  useEffect(() => {
    if (data && data.startTimer) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [data, socket]);
  const distributedQuestion = data?.distributedQuestion;

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
            <div className="quizElements">
              <Pera>Live</Pera>
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
                      <div className="options">
                        {Object.entries(distributedQuestion.options).map(
                          ([key, value]) => (
                            <Button
                              key={key}
                            >
                              <span>{`${key}) `}</span>
                              {value}
                            </Button>
                          )
                        )}
                      </div>
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

export default Live;
