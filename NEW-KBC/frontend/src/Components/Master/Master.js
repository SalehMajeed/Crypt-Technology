import { useContext, useEffect } from "react";
import SocketContext from "../../contexts/SocketContext";
import { Container, Button , Pera, CardWrapper } from "./Master.styles";
const Master = () => {
  const { socket, data } = useContext(SocketContext);

  console.log(data);

  useEffect(() => {
    if (socket) {
      socket.emit("connect-master");
    }
  }, [socket]);

  const handleStartQuiz = () => {
    socket.emit("start-quiz");
  };

  const handleResetQuiz = () => {
    socket.emit("reset-quiz");
  };

  const handleStartTimer = () => {
    socket.emit("start-timer");
  };

  const handleStopTimer = () => {
    socket.emit("stop-timer");
  };

  return (
    <Container>
      {socket && socket.connected ? (
        <CardWrapper>
          <Pera>Master-Role</Pera>
          <Button onClick={handleResetQuiz}>Reset Quiz</Button>
          <Button onClick={handleStartQuiz}>Start Quiz</Button>
          <Button onClick={handleStartTimer}>Start Timer</Button>
          <Button onClick={handleStopTimer}>Stop Timer</Button>
        </CardWrapper>
      ) : (
        <div>
        <Pera>Loading</Pera></div>
      )}
    </Container>
  );
};

export default Master;
