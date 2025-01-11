
let masterSocket = null;
let connectedUser = [];

const maxCandidates = process.env.USER_LIMIT || 5;
const maxLiveUsers = process.env.LIVE_USER_LIMIT || 5;
const questions = [];
const axios = require("axios");

let timer = null;
let responseTimes = [];

let initialState = {
  waitForMaster: true,
  startTime: null,
  startTimer: false,
  startQuiz: false,
  distributedQuestion: [],
  finalResults: null,
  questionIndex: 0
};

let finaleUsers = [];

let initialFinaleState = {
  hasReset: false,
  waitForMaster: true,
  startTime: null,
  startTimer: false,
  startQuiz: false,
  showOptions: false,
  distributedQuestion: [],
  finalResults: null,
  questionIndex: 0,
  submittedQuestion: null,
  showResult: false,
  lifeLine: {
    fifty: true,
    fiftyOnce: false,
    audiencePaul: true,
    askExpert: true,
  }
}

const resetInitialState = (questions) => {
  initialState = {
    waitForMaster: false,
    startTime: null,
    startTimer: false,
    startQuiz: false,
    showOptions: false,
    distributedQuestion: questions,
    finalResults: null,
    globalQuestions: initialState.globalQuestions,
    questionIndex: initialState.questionIndex + 1,
  };
  timer = null;
  responseTimes = [];
};

const resetFinaleInitialState = () => {
  initialFinaleState = {
    hasReset: false,
    ...initialFinaleState,
    waitForMaster: true,
    startTime: null,
    startTimer: false,
    startQuiz: false,
    finalResults: null,
    showOptions: false,
    questionIndex: 0,
    submittedQuestion: null,
    showResult: false,
    lifeLine: {
      fifty: true,
      fiftyOnce: false,
      audiencePaul: true,
      askExpert: true,
    }
  }
};

const connectAsMaster = async (socket) => {
  let isConnected = true;
  if (masterSocket) {
    console.log("Master already connected");
    isConnected = false;
  }
  console.log("Master connected");
  const response = await axios("http://localhost:3002/questions");
  data = response.data;
  const globalQuestions = data;
  const distributedQuestion = globalQuestions[initialFinaleState.questionIndex];
  initialState = { ...initialState, waitForMaster: false, globalQuestions, distributedQuestion };
  socket.emit("master-connected", {
    message: "Connected as Master",
    initialState,
  });
  // }
};

const connectAsCandidate = (socket) => {
  let isConnected = true;
  const totalCandidates = getRoleCount("candidate");
  if (totalCandidates >= maxCandidates) {
    console.log("Candidate limit reached");
    isConnected = false;
  } else {
    isConnected = connectedUser.some(eachClient => eachClient.id === socket.id);
    if (!isConnected) {
      connectedUser.push({ id: socket.id, role: "candidate" });
      console.log(connectedUser);
      console.log("Candidate connected");
      socket.emit("candidate-connected", { initialState });
    } else {
      socket.emit("candidate-connection-failed", {
        message: "Candidate limit reached",
      });
    }
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

const startQuiz = (socket, io) => {
  initialState = { ...initialState, startQuiz: true };
  connectedUser.forEach((eachUser) => {
    if (eachUser.role !== "master") {
      io.to(eachUser.id).emit("quiz-started", initialState);
    }
  });
};

const resetQuiz = (socket, io) => {
  resetInitialState(initialState.distributedQuestion);
  const distributedQuestion = initialState.globalQuestions[initialState.questionIndex];
  initialState = { ...initialState, distributedQuestion };
  io.emit("quiz-reset", initialState);
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
  if (socket === masterSocket && timer) {
    clearInterval(timer);
    io.emit("time-stopped", { message: "Time has stopped!" });
  }
};

const checkForWinner = (arr) => {
  let currentIndex = -1;
  let min = +Infinity;
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i].correctAns && min > arr[i].time) {
      min = arr[i].time;
      currentIndex = i;
    }
  }
  return currentIndex
}

const submitResponse = (data, io) => {
  const { userId, joinId, time, ans = [] } = data;
  const finalAns = ans.reduce((acc, eachAns) => acc = [...acc, eachAns.value.trim()], []).join(',');
  const rightAns = initialState.distributedQuestion.correctAnswer;
  const finalResponse = {
    userId,
    joinId,
    time: finalAns.length <= 0 ? 3000 : time,
    ans: finalAns,
    correctAns: rightAns.trim() === finalAns,
    isWinner: false,
  };
  const doesUserSubmitted = responseTimes.some(eachTime => eachTime.userId === finalResponse.userId);
  if (!doesUserSubmitted) {
    responseTimes = [...responseTimes, finalResponse];
  }
  if (responseTimes.length >= process.env.USER_LIMIT) {
    const getWinner = checkForWinner(responseTimes);
    if (getWinner !== -1) {
      responseTimes[getWinner].isWinner = true;
    }
    const finalResults = responseTimes;
    const startTime = null;
    const startTimer = false;
    initialState = { ...initialState, startTime, startTimer, finalResults }
    connectedUser.forEach((eachUser) => {
      if (eachUser.role !== "master") {
        io.to(eachUser.id).emit("quiz-ended", initialState);
      }
    });
  }
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

const updateFinaleQuestion = async (candidateType, indexSet) => {
  const response = await axios("http://localhost:3002/finaleQuestions");
  data = response.data;
  const lifeLine = {
    "fifty": true,
    "fiftyOnce": false,
    "audiencePaul": true,
    "askExpert": true
  };
  const distributedQuestion = data[candidateType][indexSet];
  initialFinaleState = {
    ...initialFinaleState,
    waitForMaster: false,
    distributedQuestion,
    lifeLine,
    questionIndex: 0
  };
}

const connectAsFinaleMaster = async (socket, data) => {
  const { candidateType, indexSet } = data;
  console.log("Finale Master connected");
  finaleMaster = socket.id;
  finaleUsers.push({ id: socket.id, role: "finale-master" });
  const response = await axios("http://localhost:3002/finaleQuestions");
  data = response.data;
  const distributedQuestion = data[candidateType][indexSet].map(eachQuestion => {
    const fifty = {};
    if (eachQuestion.a1 === "FALSE") {
      fifty.a = true;
    }

    if (eachQuestion.b1 === "FALSE") {
      fifty.b = true;
    }

    if (eachQuestion.c1 === "FALSE") {
      fifty.c = true;
    }

    if (eachQuestion.d1 === "FALSE") {
      fifty.d = true;
    }
    return ({
      id: eachQuestion.id,
      question: eachQuestion.question,
      options: {
        a: eachQuestion.a,
        b: eachQuestion.b,
        c: eachQuestion.c,
        d: eachQuestion.d
      },
      correctAnswer: eachQuestion.correctAnswer,
      fifty: fifty
    })
  });
  const lifeLine = {
    "fifty": true,
    "fiftyOnce": false,
    "audiencePaul": true,
    "askExpert": true
  };
  initialFinaleState = {
    ...initialFinaleState,
    waitForMaster: false,
    distributedQuestion,
    lifeLine,
    questionIndex: 0
  };
  socket.emit("finale-master-connected", initialFinaleState)
};

const connectAsFinaleCandidate = (socket) => {
  let isConnected = true;
  const totalCandidates = finaleUsers.length;
  if (totalCandidates >= 100) {
    console.log("Candidate limit reached");
    isConnected = false;
  } else {
    finaleUsers.push({ id: socket.id, role: "finale-candidate" });
    console.log("Finale Candidate connected");
  }
  if (!isConnected) {
    socket.emit("finale-candidate-connection-failed", {
      message: "Finale Candidate limit reached",
    });
  } else {
    socket.emit("finale-candidate-connected", initialFinaleState);
  }
};

const finaleStartQuiz = (socket, io) => {
  initialFinaleState = { ...initialFinaleState, startQuiz: true };
  io.emit("finale-quiz-started", initialFinaleState);
};

const finaleResetQuiz = (data, socket, io) => {
  resetFinaleInitialState();
  if (data?.shouldUpdate) {
    updateFinaleQuestion(data.candidateType, data.indexSet);
  }
  io.emit("finale-quiz-reset", initialFinaleState);
};

const finaleStartTimer = (socket, io) => {
  initialFinaleState = { ...initialFinaleState, startTimer: true, showOptions: true };
  io.emit("finale-timer-started", initialFinaleState);
};

const finaleStopTimer = (data, socket, io) => {
  const { lifeline } = data;
  if (lifeline === 'fifty') {
    initialFinaleState.lifeLine = { ...initialFinaleState.lifeLine, fiftyOnce: true };
  }
  initialFinaleState.lifeLine = { ...initialFinaleState.lifeLine, [lifeline]: false },
    initialFinaleState.lifeLine = { ...initialFinaleState.lifeLine, lifeLine: initialFinaleState.lifeLine };
  initialFinaleState = { ...initialFinaleState, startTimer: false, showOptions: true, };
  io.emit("finale-timer-stop", initialFinaleState);
};

const finaleSubmitAns = (ans, io) => {
  initialFinaleState = {
    ...initialFinaleState,
    submittedQuestion: ans,
    startTimer: false,
  };
  io.emit("finale-submitted-ans", initialFinaleState);
};

const finaleSubmitResponse = (socket, io) => {
  initialFinaleState = { ...initialFinaleState, showResult: true }
  io.emit("finale-submit-question", initialFinaleState);
}

const finaleNextQuestion = (socket, io) => {
  initialFinaleState = {
    ...initialFinaleState,
    questionIndex: initialFinaleState.questionIndex + 1,
    startQuiz: false,
    startTimer: false,
    showOptions: false,
    showResult: false,
    submittedQuestion: null,
    lifeLine: {
      ...initialFinaleState.lifeLine,
      fiftyOnce: false,
    }
  };
  io.emit("finale-next-question", initialFinaleState);
};

module.exports = {
  connectAsMaster,
  connectAsCandidate,
  connectAsLive,
  disconnectMaster,
  disconnectCandidate,
  disconnectLive,
  connectAsFinaleMaster,
  connectAsFinaleCandidate,
  isCandidate,
  isLive,
  startQuiz,
  resetQuiz,
  startTimer,
  stopTimer,
  submitResponse,
  finaleStartQuiz,
  finaleResetQuiz,
  finaleStartTimer,
  finaleStopTimer,
  finaleSubmitAns,
  finaleSubmitResponse,
  finaleNextQuestion,
};
