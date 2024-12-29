import { QuizService } from "../Services/QuizServices.js";
import axios from "axios";

export class QuizController {
  constructor(io) {
    this.quizService = new QuizService();
    this.io = io;
  }

  async handleConnection(socket) {
    let data = [];
    try {
      const response = await axios.get(`http://localhost:3000/questions`);
      data = response.data;
      this.quizService.questions = data;
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }

    socket.on("join", ({ role }) => {
      console.log(`${role} connected with ID: ${socket.id}`);

      const result = this.quizService.addUser(socket.id, role);
      if (result.error) {
        socket.emit("error", result.error);
        socket.disconnect();
        return;
      }

      if (role === "master") {
        socket.emit("quizStatus", { state: "waiting" });
        socket.emit("candidates", result.candidateData);
      }

      this.io.emit("candidateJoined", result.candidateData);

      // If all users are connected, start the quiz
      if (this.quizService.activeUsers.length === 3) {
        this.io.emit("quizStatus", { state: "started" });
        this.startNextQuestion();
      }
    });

    socket.on("start-quiz", () => {
      const quiz = this.quizService.startQuiz();

      if (quiz.error) {
        socket.emit("error", quiz.error);
        return;
      }

      this.io.emit("quiz-status", { state: "started" });
      this.io.emit("question", quiz.question);
      console.log("Quiz started with question:", quiz.question);
    });

    socket.on("question", (id) => {
      const currentQuestion = data.find((item) => item.id == id);
      if (currentQuestion) {
        socket.emit("currentQuestion", currentQuestion);
      } else {
        console.error(`Question with ID ${id} not found.`);
        socket.emit("currentQuestion", {
          question: "Question not found",
          options: [],
        });
      }
    });

    socket.on("answer", (data) => {
      console.log("stored answer" + data.answer)
      const result = this.quizService.recordResponse(
        socket.id,
        data.answer,
        data.timeTaken
      );

      // Emit or log the response immediately
      this.io.emit("candidateResponse", {
        userId: socket.id,
        answer: data.answer,
        timeTaken: data.timeTaken,
      });

      if (result.status === "correct") {
        this.io.emit("quizResult", {
          status: "correct",
          socketId: result.userId,
          timeTaken: result.responseTime,
          correctAnswer: this.quizService.currentQuestion.correctAnswer,
        });
        this.io.emit("winner", result.userId);
      } else if (result.status === "incorrect") {
        socket.emit("quizResult", {
          status: "incorrect",
          correctAnswer: this.quizService.currentQuestion.correctAnswer,
        });
        socket.emit("loser");
      }
    });

    socket.on("timeUp", (data) => {
      console.log(`Time is up for Qid ${data.Qid}`);
      socket.emit("quizResult", {
        status: "timeUp",
        correctAnswer: this.quizService.currentQuestion.correctAnswer,
      });
      socket.emit("loser");
    });
  }

  startNextQuestion() {
    const quiz = this.quizService.startQuiz();
    if (quiz.error) {
      console.error("Error starting quiz:", quiz.error);
      return;
    }
    this.io.emit("question", quiz.question);
  }
}
