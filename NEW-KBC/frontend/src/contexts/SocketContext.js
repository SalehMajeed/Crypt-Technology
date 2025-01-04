import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('master-connection-failed', (data) => {
      setConnectionStatus(data.message);
    });

    newSocket.on('candidate-connection-failed', (data) => {
      setConnectionStatus(data.message);
    });

    newSocket.on('master-connected', (data) => {
      setConnectionStatus(data.message);
    });

    newSocket.on('candidate-connected', (data) => {
      setConnectionStatus(data.message);
    });

    newSocket.on('live-connected', (data) => {
      setConnectionStatus(data.message);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectionStatus }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
