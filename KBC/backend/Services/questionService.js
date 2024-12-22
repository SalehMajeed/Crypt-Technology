let connectedCandidates = [];
let currentQuestionIndex = 1;
let candidateAnswers = [];
let questions = [
    { id: 1, text: "What is 2 + 2?", correctAnswer: "4" },
    { id: 2, text: "What is the capital of France?", correctAnswer: "Paris" },
];
let currentQuestion = null;

export const distributeQuestionToCandidates = () => {
    if (currentQuestionIndex <= 1) {
        currentQuestion = questions[0];
        connectedCandidates.forEach((socket) => {
            console.log(socket.id, currentQuestion);
            socket.emit("new_question", currentQuestion);
        });
        return true;
    }
    return false;
};

export const resetCandidates = () => {
    connectedCandidates.forEach((socket) => socket.disconnect());
    connectedCandidates = [];
    currentQuestionIndex = 0;
    candidateAnswers = [];
};

export const loadNextQuestionForCandidates = () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        candidateAnswers = [];
        distributeQuestionToCandidates();
        return true;
    }
    return false;
};

export const handleAnswerSubmission = (socket, data) => {
    const { answer, time } = data;

    candidateAnswers.push({ id: socket.id, answer, time });

    if (candidateAnswers.length === connectedCandidates.length) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;

        const winners = candidateAnswers
            .filter((candidate) => candidate.answer === correctAnswer)
            .sort((a, b) => a.time - b.time);

        connectedCandidates.forEach((candidateSocket) => {
            const isWinner = winners.length && winners[0].id === candidateSocket.id;
            candidateSocket.emit("result", { winner: isWinner });
        });

        candidateAnswers = [];
    }
};

export const addCandidateSocket = (socket) => connectedCandidates.push(socket);
export const removeCandidateSocket = (socket) =>
    (connectedCandidates = connectedCandidates.filter((s) => s.id !== socket.id));
