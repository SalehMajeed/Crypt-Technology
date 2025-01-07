import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const FinaleHost = () => {
  const { socket, data } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-finale-host');
    }
  }, [socket]);

  return (
    <div>
      {socket && socket.connected && data && data.startQuiz ? <div>
        <h2>Finale Host Role</h2>
        {data.waitForMaster ? 'waiting' : <div>
          <div>This Is Question</div>
          {data.startTimer ? <div>
            <div>timer has started read the question</div>
            <button>Submit</button>
          </div> : <div>
            wait for timer
          </div>}
        </div>}
      </div> : <div>loading</div>}
    </div>
  );
};

export default FinaleHost;
