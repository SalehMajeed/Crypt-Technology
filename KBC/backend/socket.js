import {
    addCandidateSocket,
    removeCandidateSocket,
    handleAnswerSubmission,
} from "./Services/questionService.js";

export const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Candidate connected:", socket.id);
        addCandidateSocket(socket);

        socket.on("submit_answer", (data) => {
            handleAnswerSubmission(socket, data);
        });

        socket.on("disconnect", () => {
            console.log("Candidate disconnected:", socket.id);
            removeCandidateSocket(socket);
        });
    });
};
