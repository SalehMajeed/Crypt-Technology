let masterSocket = null;
let connectedUser = [];
const maxCandidates = process.env.USER_LIMIT || 5;
const maxLiveUsers = process.env.LIVE_USER_LIMIT || 5;
let timer = null;
let responseTimes = {};
const questions = [];

let initialState = {
  waitForMaster: true,
  startTime: 30,
  startTimer: false,
  startQuiz: false,
  distributedQuestion: [],
};

const resetInitialState = () => {
  initialState = {
    waitForMaster: false,
    startTime: null,
    startTimer: false,
    startQuiz: false,
    distributedQuestion: [],
  };
  timer = null;
  responseTimes = {};
};

const connectAsMaster = (socket) => {
  let isConnected = true;
  if (masterSocket) {
    console.log("Master already connected");
    isConnected = false;
  }
  console.log("Master connected");
  const distributedQuestion = [1, 2, 3, 4];
  initialState = { ...initialState, waitForMaster: false, distributedQuestion };

  if (!isConnected) {
    socket.emit("master-connection-failed", {
      message: "Master already connected",
      initialState,
    });
  } else {
    socket.emit("master-connected", {
      message: "Connected as Master",
      initialState,
    });
  }
};

const connectAsCandidate = (socket) => {
  let isConnected = true;
  const totalCandidates = getRoleCount("candidate");
  if (totalCandidates >= maxCandidates) {
    console.log("Candidate limit reached");
    isConnected = false;
  } else {
    connectedUser.push({ id: socket.id, role: "candidate" });
    console.log("Candidate connected");
  }
  if (!isConnected) {
    socket.emit("candidate-connection-failed", {
      message: "Candidate limit reached",
    });
  } else {
    socket.emit("candidate-connected", { initialState });
  }
};

const connectAsLive = (socket) => {
  let isConnected = true;
  const totalLive = getRoleCount("live");
  if (totalLive >= maxLiveUsers) {
    console.log("Live limit reached");
    isConnected = false;
  }
  connectedUser.push({ id: socket.id, role: "live" });
  console.log("Live user connected");
  if (!isConnected) {
    socket.emit("live-connection-failed", { message: "Live limit reached" });
  } else {
    socket.emit("live-connected", { initialState });
  }
};

const disconnectMaster = () => {
  masterSocket = null;
  console.log("Master disconnected");
};

const disconnectCandidate = (socket) => {
  connectedUser = connectedUser.filter((candidate) => candidate !== socket);
  console.log("Candidate disconnected");
};

const disconnectLive = (socket) => {
  connectedUser = connectedUser.filter((liveUser) => liveUser !== socket);
  console.log("Live user disconnected");
};

const startQuiz = (socket, io, dataQuestions) => {
  initialState = { ...initialState, startQuiz: true };
  initialState.distributedQuestion = [...dataQuestions ];
  console.log(initialState.distributedQuestion)
  connectedUser.forEach((eachUser) => {
    if (eachUser.role !== "master") {
      io.to(eachUser.id).emit("quiz-started", initialState);
    }
  });
};

const resetQuiz = (socket, io) => {
  resetInitialState();
  io.emit("quiz-started", initialState);
};

const startTimer = (socket, io) => {
  initialState.startTime = Date.now();
  initialState = { ...initialState, startTimer: true };
  connectedUser.forEach((eachUser) => {
    if (eachUser.role !== "master") {
      io.to(eachUser.id).emit("quiz-started", initialState);
    }
  });
};

const stopTimer = (socket, io) => {
  if (socket === connectionService.masterSocket && timer) {
    clearInterval(timer);
    io.emit("time-stopped", { message: "Time has stopped!" });
  }
};

const checkAllResponses = (io) => {
  io.emit("all-responses", { responseTimes });
};

const submitResponse = (data, io) => {
  const { userId, time } = data;
  responseTimes[userId] = time;
  console.log(responseTimes);
  // io.emit('response-submitted', { userId, time });
  // checkAllResponses(io);
};

const isCandidate = (socket) => {
  return connectedUser.findIndex((eachUser) => eachUser.id === socket);
};

const isLive = (socket) => {
  return connectedUser.findIndex((eachUser) => eachUser.id === socket);
};

const getRoleCount = (role) => {
  return connectedUser.reduce((acc, eachUser) => {
    if (eachUser.role === role) {
      acc += 1;
    }
    return acc;
  }, 0);
};

module.exports = {
  connectAsMaster,
  connectAsCandidate,
  connectAsLive,
  disconnectMaster,
  disconnectCandidate,
  disconnectLive,
  isCandidate,
  isLive,
  startQuiz,
  resetQuiz,
  startTimer,
  stopTimer,
  submitResponse,
  questions,
};
