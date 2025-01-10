import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import { Container, Button, Pera, CardWrapper } from "./Master.styles";
import resetTimeSound from '../assets/start.mp3';
import playSound from '../assets/play.mp3';
import timerSound from '../assets/tictok.mp3';

const startSound = new Audio(resetTimeSound);

const Master = () => {
  const { socket, data } = useContext(SocketContext);
  const playTheme = new Audio(playSound);
  const playTimer = useRef(new Audio(timerSound));

  useEffect(() => {
    if (socket) {
      socket.emit("connect-master");
    }
  }, [socket]);

  const handleStartQuiz = () => {
    playTheme.play();
    socket.emit("start-quiz");
  };

  const handleResetQuiz = () => {
    startSound.play();
    socket.emit("reset-quiz");
  };

  const handleStartTimer = () => {
    playTimer.current.play();
    socket.emit("start-timer");
  };

  const handleStopTimer = () => {
    playTimer.current.pause(); // Stop the timer sound immediately
    // socket.emit("stop-timer");
  };

  const handleStartTheme = () => {
    startSound.play()
  }

  return (
    <Container>
      {socket && socket.connected ? (
        <CardWrapper>
          <Pera>Master-Role</Pera>
          <Button onClick={handleStartTheme}>Start Theme song</Button>
          <Button onClick={handleResetQuiz}>Reset Quiz</Button>
          <Button onClick={handleStartQuiz}>Start Quiz</Button>
          <Button onClick={handleStartTimer}>Start Timer</Button>
          <Button onClick={handleStopTimer}>Stop Timer</Button>
        </CardWrapper>
      ) : (
        <div>
          <Pera>Loading</Pera>
        </div>
      )}
    </Container>
  );
};

export default Master;
