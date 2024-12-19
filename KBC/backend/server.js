import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import { QuizController } from "./Controllers/QuizController.js";

dotenv.config();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const quizController = new QuizController(io);

io.on("connection", (socket) => {
  quizController.handleConnection(socket);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
