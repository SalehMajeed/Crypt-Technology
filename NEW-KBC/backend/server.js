const express = require('express');
const http = require('http');
require('dotenv').config();
const socketIo = require('socket.io');
const { handleConnection, handleDisconnection, handleStartQuiz, handleResetQuiz, handleStartTimer, handleStopTimer, handleSubmitResponse, handleFinaleStartQuiz, handleFinaleResetQuiz, handleFinaleStartTimer, handleFinaleStopTimer, handleFinaleSubmitResponse, handleSubmitFinaleAns } = require('./controllers/connectionController');
const { finaleNextQuestion } = require('./services/connectionService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New connection established');

  socket.on('connect-master', () => handleConnection(socket, JSON.stringify({ type: 'connect-master' })));
  socket.on('connect-candidate', () => handleConnection(socket, JSON.stringify({ type: 'connect-candidate' })));
  socket.on('connect-live', () => handleConnection(socket, JSON.stringify({ type: 'connect-live' })));
  
  socket.on('start-quiz', () => handleStartQuiz(socket, io));
  socket.on('reset-quiz', () => handleResetQuiz(socket, io));
  socket.on('start-timer', () => handleStartTimer(socket, io));
  socket.on('stop-timer', () => handleStopTimer(socket, io));
  socket.on('submit-response', (data) => handleSubmitResponse(data, io));

  socket.on('connect-finale-master', () => handleConnection(socket, JSON.stringify({ type: 'connect-finale-master' })));
  socket.on('connect-finale-candidate', () => handleConnection(socket, JSON.stringify({ type: 'connect-finale-candidate' })));
  socket.on('start-finale-quiz', () => handleFinaleStartQuiz(socket, io));
  socket.on('reset-finale-quiz', () => handleFinaleResetQuiz(socket, io));
  socket.on('start-finale-timer', () => handleFinaleStartTimer(socket, io));
  socket.on('stop-finale-timer', (data) => handleFinaleStopTimer(data, socket, io));
  socket.on('submit-finale-ans', (data) => handleSubmitFinaleAns(data, io));
  socket.on('submit-finale-response', () => handleFinaleSubmitResponse(socket, io));
  socket.on('finale-next-question', () => finaleNextQuestion(socket, io));
  
  socket.on('disconnect', () => handleDisconnection(socket));
});

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
