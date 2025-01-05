const connectionService = require('../services/connectionService');

let timer = null;
let startTime = null;
let responseTimes = {};

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


const handleStartQuiz = (socket, io) => {
  io.emit('quiz-started', { message: 'Quiz has started!' });
};

const handleResetQuiz = (socket, io) => {

};

const handleStartTimer = (socket, io) => {
  if (socket === connectionService.masterSocket) {
    startTime = Date.now();
    io.emit('time-started', { message: 'Timer started' });
    timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      io.emit('time-update', { time: elapsedTime });
      if (elapsedTime >= 30) {
        clearInterval(timer);
        io.emit('time-stopped', { message: 'Time has stopped!' });
      }
    }, 1000);
  }
};

const handleStopTimer = (socket, io) => {
  if (socket === connectionService.masterSocket && timer) {
    clearInterval(timer);
    io.emit('time-stopped', { message: 'Time has stopped!' });
  }
};

const handleSubmitResponse = (data, io) => {
  const { userId, time } = data;
  responseTimes[userId] = time;
  io.emit('response-submitted', { userId, time });
  checkAllResponses(io);
};

const checkAllResponses = (io) => {
  io.emit('all-responses', { responseTimes });
};

module.exports = {
  handleConnection,
  handleDisconnection,
  handleStartQuiz,
  handleResetQuiz,
  handleStartTimer,
  handleStopTimer,
  handleSubmitResponse,
};
