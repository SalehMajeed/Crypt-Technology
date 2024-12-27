import React, { useState, useEffect } from "react";
import {
  Container,
  CardWrapper,
  Header,
  TimerCircle,
  Button,
  Footer,
} from "./Live.styles";

function App() {
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
          <p>Fastest Fingers First Question</p>
          <h6>PLAYING FOR</h6>
          <TimerCircle>
            <h2>{timer}</h2>
          </TimerCircle>
        </Header>

        <div>
          <p>
            Arrange these mountain peaks according to their height, from the
            tallest to the shortest
          </p>
          <div>
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

export default App;
