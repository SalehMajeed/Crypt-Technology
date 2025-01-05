let masterSocket = null;
let candidates = [];
let liveUsers = [];
const maxCandidates = process.env.USER_LIMIT || 5;
const maxLiveUsers = process.env.LIVE_USER_LIMIT || 5;

const connectAsMaster = (socket) => {
  if (masterSocket) {
    console.log('Master already connected');
    return false;
  }
  masterSocket = socket;
  console.log('Master connected');
  return true;
};

const connectAsCandidate = (socket) => {
  if (candidates.length >= maxCandidates) {
    console.log('Candidate limit reached');
    return false;
  }
  candidates.push(socket);
  console.log('Candidate connected');
  return true;
};

const connectAsLive = (socket) => {
  if (liveUsers.length >= maxLiveUsers) {
    console.log('Live limit reached');
    return false;
  }
  liveUsers.push(socket);
  console.log('Live user connected');
  return true;
};

const disconnectMaster = () => {
  masterSocket = null;
  console.log('Master disconnected');
};

const disconnectCandidate = (socket) => {
  candidates = candidates.filter((candidate) => candidate !== socket);
  console.log('Candidate disconnected');
};

const disconnectLive = (socket) => {
  liveUsers = liveUsers.filter((liveUser) => liveUser !== socket);
  console.log('Live user disconnected');
};

const isCandidate = (socket) => {
  return candidates.includes(socket);
};

const isLive = (socket) => {
  return liveUsers.includes(socket);
};

const getCandidateCount = () => {
  return candidates.length;
};

const getLiveUserCount = () => {
  return liveUsers.length;
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
  getCandidateCount,
  getLiveUserCount,
};
