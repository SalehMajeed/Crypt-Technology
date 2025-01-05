import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    
    newSocket.on('master-connected', (data) => {
      setData(data);
    });

    newSocket.on('candidate-connected', (data) => {
      setData(data);
    });

    newSocket.on('live-connected', (data) => {
      setData(data);
    });

    newSocket.on('master-connection-failed', (data) => {
      setData(data);
    });

    newSocket.on('candidate-connection-failed', (data) => {
      setData(data);
    });

    newSocket.on('quiz-started', (data) => {
      setData(data);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, data }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
