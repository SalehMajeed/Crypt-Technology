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
  }

    else if (parsedMessage.type === 'connect-candidate') {
    const isConnected = connectionService.connectAsCandidate(socket);
    if (!isConnected) {
      socket.emit('candidate-connection-failed', { message: 'Candidate limit reached' });
    } else {
      socket.emit('candidate-connected', { message: 'Connected as Candidate' });
    }
  }

    else if (parsedMessage.type === 'connect-live') {
    const isConnected = connectionService.connectAsLive(socket);
    if (!isConnected) {
      socket.emit('live-connection-failed', { message: 'Live limit reached' });
    } else {
      socket.emit('live-connected', { message: 'Connected as Live' });
    }
  }
};

const handleDisconnection = (socket) => {
  if (socket === connectionService.masterSocket) {
    connectionService.disconnectMaster();
  } else if (connectionService.isCandidate(socket)) {
    connectionService.disconnectCandidate(socket);
  } else if (connectionService.isLive(socket)) {
    connectionService.disconnectLive(socket);
  }
};

module.exports = {
  handleConnection,
  handleDisconnection,
};
