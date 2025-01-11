const connectionService = require("../services/connectionService");
const handleConnection = (socket, message, data) => {
  console.log(data);
  const parsedMessage = JSON.parse(message);
  console.log(message);
  if (parsedMessage.type === "connect-master") {
    connectionService.connectAsMaster(socket);
  } else if (parsedMessage.type === "connect-candidate") {
    connectionService.connectAsCandidate(socket, data);
  } else if (parsedMessage.type === "connect-live") {
    connectionService.connectAsLive(socket);
  } else if (parsedMessage.type === "connect-finale-master") {
    connectionService.connectAsFinaleMaster(socket, data);
  } else if (parsedMessage.type === "connect-finale-candidate") {
    connectionService.connectAsFinaleCandidate(socket);
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
  connectionService.startQuiz(socket, io);
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

const handleFinaleStartQuiz = async (socket, io) => {
  connectionService.finaleStartQuiz(socket, io);
};

const handleFinaleResetQuiz = (data, socket, io) => {
  connectionService.finaleResetQuiz(data, socket, io);
};

const handleFinaleStartTimer = (socket, io) => {
  connectionService.finaleStartTimer(socket, io);
};

const handleFinaleStopTimer = (data, socket, io) => {
  connectionService.finaleStopTimer(data,socket, io);
};

const handleFinaleNextAns = () => {
  connectionService.finaleNextQuestion(socket, io);
};

const handleSubmitFinaleAns = (data, io) => {
  const {userAns} = data;
  connectionService.finaleSubmitAns(userAns, io);
};

const handleFinaleSubmitResponse = (socket, io) => {
  connectionService.finaleSubmitResponse(socket, io);
};



module.exports = {
  handleConnection,
  handleDisconnection,
  handleStartQuiz,
  handleResetQuiz,
  handleStartTimer,
  handleStopTimer,
  handleSubmitResponse,
  handleFinaleStartQuiz,
  handleFinaleResetQuiz,
  handleFinaleStartTimer,
  handleFinaleStopTimer,
  handleSubmitFinaleAns,
  handleFinaleSubmitResponse,
  handleFinaleNextAns,
};
