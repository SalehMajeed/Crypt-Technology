import { useContext, useEffect, useState, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import {
  Container,
  Pera,
  Question,
  Logo,
  CardWrapper,
  TimerCircle,
  Header,
  Button,
} from "./Live.styles.js";

const Live = () => {
  const { socket, data } = useContext(SocketContext);
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-live");
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
  }, [data]);


  const distributedQuestion = data?.distributedQuestion;

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
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
                  <div> className='winnersDiv'
                    <ul>
                      {data.finalResults.map((eachResult, index) => (
                        <li key={index}>
                          <ul className={eachResult.isWinner ? "winner" : "looser"}>
                            <li>{eachResult.userId}</li>
                            <li>
                              {(eachResult.time / 1000).toFixed(3)} Seconds
                            </li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Question>{distributedQuestion.question}</Question>
                    <div>
                      {data.startTimer ? (
                        <>
                          <div className="options">
                            {Object.entries(distributedQuestion.options).map(
                              ([key, value]) => (
                                <Button key={key}>
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
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <Pera style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <img
              src="./KBC_Logo.jpg"
              alt="Loading..."
              style={{ width: "250px", height: "auto", mixBlendMode : 'color-dodge' }}
            />
          </Pera>
        )}
      </CardWrapper>
    </Container>
  );
};

export default Live;
