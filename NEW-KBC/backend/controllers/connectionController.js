const connectionService = require('../services/connectionService');

const handleConnection = (socket, message) => {
  const parsedMessage = JSON.parse(message);

  if (parsedMessage.type === 'connect-master') {
    const isConnected = connectionService.connectAsMaster(socket);
    if (!isConnected) {
      socket.emit('master-connection-failed', { message: 'Master already connected' });
    } else {
      socket.emit('master-connected', { message: 'Connected as Master' });
    }
  } else if (parsedMessage.type === 'connect-candidate') {
    const isConnected = connectionService.connectAsCandidate(socket);
    if (!isConnected) {
      socket.emit('candidate-connection-failed', { message: 'Candidate limit reached' });
    } else {
      socket.emit('candidate-connected', { message: 'Connected as Candidate' });
    }
  }
};

const handleDisconnection = (socket) => {
  if (socket === connectionService.masterSocket) {
    connectionService.disconnectMaster();
  } else {
    connectionService.disconnectCandidate(socket);
  }
};

module.exports = {
  handleConnection,
  handleDisconnection,
};
