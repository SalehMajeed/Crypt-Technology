import express from "express";
import cors from "cors";
import { WebSocketServer } from 'ws';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const wss = new WebSocketServer({ port: 3002 })

let master = null
let candidates = new Set()

wss.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('message', (data) => {
    const message = JSON.parse(data)

    if (message.role === 'master') {
      master = socket
      console.log('masted connected')
    } else if (message.role === 'candidate') {
      candidates.add(socket);
      console.log('Candidate connected');
    }

    if (message.type === "start-quiz" && socket === master) {
      console.log("Quiz started by master. Notifying candidates...");
      candidates.forEach((candidate) => {
        candidate.send(
          JSON.stringify({ type: "quiz-status", state: "started" })
        );
      });
    }

    if (message.type === "check-quiz-status") {
      if (master) {
        master.send(JSON.stringify({ type: "quiz-status", state: "started" }));
      } else {
        socket.send(
          JSON.stringify({ type: "quiz-status", state: "waiting" })
        );
      }
    }
  });
  socket.on('close', () => {
    console.log('Client disconnected');
    if (socket === master) {
      master = null;
      console.log('Master disconnected');
    } else {
      candidates.delete(socket);
      console.log('Candidate disconnected');
    }
  })
})


app.get("/greet", (req, res) => {
  res.json({ message: "hello React Devs from the server" });
});

export default app;
