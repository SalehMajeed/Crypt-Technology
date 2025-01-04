const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectionController = require('./controllers/connectionController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('New connection established');

  socket.on('connect-master', () => {
    connectionController.handleConnection(socket, JSON.stringify({ type: 'connect-master' }));
  });

  socket.on('connect-candidate', () => {
    connectionController.handleConnection(socket, JSON.stringify({ type: 'connect-candidate' }));
  });

  socket.on('disconnect', () => {
    connectionController.handleDisconnection(socket);
  });
});

app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
