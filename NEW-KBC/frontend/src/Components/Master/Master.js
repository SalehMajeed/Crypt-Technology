import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Master = () => {
  const { socket, data } = useContext(SocketContext);

  console.log(data);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-master');
    }
  }, [socket]);

  const handleStartQuiz = () => {
    socket.emit('start-quiz');
  }

  const handleResetQuiz = () => {
    socket.emit('reset-quiz');
  }

  const handleStartTimer = () => {
    socket.emit('start-timer');
  }

  const handleStopTimer = () => {
    socket.emit('stop-timer');
  }

  return (<div>
    {socket && socket.connected ? <div><h2>Master Role</h2>
      <button onClick={handleStartQuiz}>Start Quiz</button>
      <button onClick={handleResetQuiz}>Reset Quiz</button>
      <button onClick={handleStartTimer}>Start Timer</button>
      <button onClick={handleStopTimer}>Stop Timer</button></div> : <div>loading</div>}
  </div>
  );
};

export default Master;
