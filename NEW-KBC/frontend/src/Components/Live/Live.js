import { useContext, useEffect, useState, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import useSound from "use-sound";
import playSound from "../assets/play.mp3";
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
  const [play, { stop }] = useSound(playSound);

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

  useEffect(() => {
    if (data?.startQuiz) {
      play();
      const soundTimer = setTimeout(() => {
        stop();
      }, 3000);
      return () => {
        clearTimeout(soundTimer);
      };
    }
  }, [data?.startQuiz, play, stop]);

  const distributedQuestion = data?.distributedQuestion;

  return (
    <Container>
      <CardWrapper>
        {socket && socket.connected && data && data.startQuiz ? (
          <div className="elementsDiv">
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
                {data.finalResults ? (
                  <div>
                    <ul>
                      {data.finalResults.map((eachResult, index) => (
                        <li key={index}>
                          <ul color={eachResult.isWinner ? "green" : "red"}>
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
          <Pera>Loading..</Pera>
        )}
      </CardWrapper>
    </Container>
  );
};

export default Live;
