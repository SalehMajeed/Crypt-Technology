import React, { useState, useEffect } from "react";
import {
  Container,
  CardWrapper,
  Header,
  TimerCircle,
  Button,
  Footer,
} from "./Live.styles";

function Live() {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <Container>
      <CardWrapper>
        <Header>
          <TimerCircle>
            <h2>{timer}</h2>
          </TimerCircle>
        </Header>

        <div>
          <div className="question">
            <p>
              Arrange these mountain peaks according to their height, from the
              tallest to the shortest
            </p>
          </div>
          <div className="answers">
            <Button>A. Everest</Button>
            <Button>B. Kalsubai</Button>
            <Button>C. Nanda Devi</Button>
            <Button>D. Kangchenjunga</Button>
          </div>
        </div>

        <Footer>
          <Button small secondary>
            Submit
          </Button>
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Live;
