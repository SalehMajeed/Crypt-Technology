import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Candidate = () => {
  const { socket, connectionStatus } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-candidate');
    }
  }, [socket]);

  return (
    <div>
      <h2>Candidate Role</h2>
      <p>Status: {connectionStatus}</p>
    </div>
  );
};

export default Candidate;
