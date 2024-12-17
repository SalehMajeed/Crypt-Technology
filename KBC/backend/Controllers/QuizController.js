import { QuizService } from "../Services/QuizServices.js";

export class QuizController {
  constructor(io) {
    this.quizService = new QuizService();
    this.io = io;
  }

  handleConnection(socket) {
    const result = this.quizService.addUser(socket.id);
    if (result.error) {
      socket.emit("error", result.error);
      socket.disconnect();
      return;
    }

    console.log("User connected:", socket.id);

    if (this.quizService.activeUsers.length === 3) {
      const quiz = this.quizService.startQuiz();
      this.io.emit("question", quiz.question);
      console.log("Quiz started with question:", quiz.question);
    }

    socket.on("answer", (data) => {
      const result = this.quizService.recordResponse(socket.id, data.answer);
      if (result) {
        this.io.emit("result", result.winner);
        console.log("Quiz winner:", result.winner);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      this.quizService.removeUser(socket.id);
    });
  }
}
