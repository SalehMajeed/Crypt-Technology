import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Live = () => {
  const { socket, data } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-live');
    }
  }, [socket]);

  return (
    <div>
      {socket && socket.connected && data && data.startQuiz ? <div>
        <h2>Live Role</h2>
        {data.waitForMaster ? 'waiting' : <div>
          <div>This Is Question</div>
          {data.startTimer ? <div>
            <div>timer has started read the question</div>
          </div> : <div>
            wait for timer
          </div>}
        </div>}
      </div> : <div>loading</div>}
    </div>
  );
};

export default Live;
