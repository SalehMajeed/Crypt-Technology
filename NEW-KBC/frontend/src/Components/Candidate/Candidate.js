import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Candidate = () => {
  const { socket, data } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-candidate');
    }
  }, [socket]);

  const handleSubmit = () => {
    const currentTime = Date.now();
    const responseTime = Math.floor((currentTime - data.startTime) / 1000);
    socket.emit('submit-response',  { userId: socket.id, time: responseTime });
  };

  return (
    <div>
      {socket && socket.connected && data && data.startQuiz ? <div>
        <h2>Candidate Role</h2>
        {data.waitForMaster ? 'waiting' : <div>
          <div>This Is Question</div>
          {data.startTimer ? <div>
            <div>timer has started read the question</div>
            <button onClick={handleSubmit}>Submit</button>
          </div> : <div>
            wait for timer
          </div>}
        </div>}
      </div> : <div>loading</div>}
    </div>
  );
};

export default Candidate;
