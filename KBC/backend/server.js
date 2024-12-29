import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import { QuizController } from "./Controllers/QuizController.js";

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true 
  },
});

const quizController = new QuizController(io);

io.on("connection", (socket) => {
  quizController.handleConnection(socket);
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
