// src/components/Master.js
import { useContext, useEffect } from 'react';
import SocketContext from '../../contexts/SocketContext';

const Master = () => {
  const { socket, connectionStatus } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit('connect-master');
    }
  }, [socket]);

  return (
    <div>
      <h2>Master Role</h2>
      <p>Status: {connectionStatus}</p>
    </div>
  );
};

export default Master;
