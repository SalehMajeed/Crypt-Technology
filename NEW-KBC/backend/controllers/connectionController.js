const connectionService = require("../services/connectionService");
const axios = require("axios");
const handleConnection = (socket, message) => {
  const parsedMessage = JSON.parse(message);

  if (parsedMessage.type === "connect-master") {
    connectionService.connectAsMaster(socket);
  } else if (parsedMessage.type === "connect-candidate") {
    connectionService.connectAsCandidate(socket);
  } else if (parsedMessage.type === "connect-live") {
    connectionService.connectAsLive(socket);
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

const handleStartQuiz = async (socket, io) => {
  let data;
  try {
    const response = await axios("http://localhost:8000/questions");
    data = response.data;
    connectionService.questions = data;
  } catch (error) {
    console.error("Error fetching questions:", error.message);
  }

  connectionService.startQuiz(socket, io, data);
};

const handleResetQuiz = (socket, io) => {
  connectionService.resetQuiz(socket, io);
};

const handleStartTimer = (socket, io) => {
  connectionService.startTimer(socket, io);
};

const handleStopTimer = (socket, io) => {
  connectionService.stopTimer(socket, io);
};

const handleSubmitResponse = (data, io) => {
  connectionService.submitResponse(data, io);
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
