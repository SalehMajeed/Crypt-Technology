import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { setupSocket } from "./socket.js";
import questionController from "./Controllers/questionController.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001", // React app URL
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// Setup Socket.IO
setupSocket(io);

// REST API routes
app.post("/master/distribute", questionController.distributeQuestion);
app.post("/master/reset", questionController.reset);
app.post("/candidate/next", questionController.loadNextQuestion);

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
