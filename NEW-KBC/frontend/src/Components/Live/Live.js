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

import fiftyFiftyImg from "../assets/fifty_fifty.png";
import audiencePoll from "../assets/audience_poll.png";
import expertLifeLine from "../assets/ask_the_expert.png";

const Live = () => {
  const [timer, setTimer] = useState(30);
  const { socket, data } = useContext(SocketContext);
  const [questions, setQuestions] = useState({
    id: "2",
    question: "What is the capital of France?",
    options: {
      a: "Berlin",
      b: "Madrid",
      c: "Rome",
      d: "Paris",
    },
    correctAnswer: "d",
  });

  const moneyList = [
    { id: "1)", amount: "Rs. 500" },
    { id: "2)", amount: "Rs. 1,000" },
    { id: "3)", amount: "Rs. 2,000" },
    { id: "4)", amount: "Rs. 4,000" },
    { id: "5)", amount: "Rs. 7,000" },
    { id: "6)", amount: "Rs. 15,000" },
    { id: "7)", amount: "Rs. 21,000" },
  ].reverse();

  useEffect(() => {
    if (socket) {
      socket.emit("connect-live");
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-candidate");
    }
  }, [socket]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(countdown);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

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
                  <Question>Who is the first Prime Minister of India?</Question>
                  <div>
                    {data.startTimer ? (
                      <div className="options">
                        {Object.entries(questions.options).map(
                          ([key, value]) => (
                            <Button
                              >
                              <span>{`${key}) `}</span>
                                { value}
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

            <div className="sideBar">
              <div className="lifeLine">
                <span>
                  <img src={fiftyFiftyImg} alt="Fifty Fifty Lifeline" />
                </span>
                <span>
                  <img src={audiencePoll} alt="Audience Poll Lifeline" />
                </span>
                <span>
                  <img
                    className="expertLifeLine"
                    src={expertLifeLine}
                    alt="Expert Lifeline"
                  />
                </span>
              </div>
              <ul>
                {moneyList.map((el) => (
                  <li key={el.id}>
                    <span className="indexOfPrice">{el.id}</span>
                    <span className="price">{el.amount}</span>
                  </li>
                ))}
              </ul>
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
