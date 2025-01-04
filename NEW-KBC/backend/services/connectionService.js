let masterSocket = null;
let candidates = [];
const maxCandidates = process.env.USER_LIMIT

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

const disconnectMaster = () => {
  masterSocket = null;
  console.log('Master disconnected');
};

const disconnectCandidate = (socket) => {
  candidates = candidates.filter((candidate) => candidate !== socket);
  console.log('Candidate disconnected');
};

const getCandidateCount = () => {
  return candidates.length;
};

module.exports = {
  connectAsMaster,
  connectAsCandidate,
  disconnectMaster,
  disconnectCandidate,
  getCandidateCount,
};
