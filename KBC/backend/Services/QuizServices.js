
export class QuizService {
  constructor() {
    this.questions = [
      "What will be the output of -10 + 10?",
      "What will be the output of 'a' === 1?",
      "What will be the output of typeof NaN?",
    ];
    this.activeUsers = [];
    this.responses = [];
    this.currentQuestion = null;
    this.questionStartTime = null;
  }

  addUser(userId) {
    if (this.activeUsers.length >= 3) {
      return { error: "No more users allowed!" };
    }
    this.activeUsers.push(userId);
    return { success: true, users: this.activeUsers };
  }

  removeUser(userId) {
    this.activeUsers = this.activeUsers.filter((id) => id !== userId);
  }

  startQuiz() {
    this.currentQuestion = this.questions[1];
    this.responses = [];
    this.questionStartTime = Date.now();
    return {
      question: this.currentQuestion,
      startTime: this.questionStartTime,
    };
  }

  recordResponse(userId, answer) {
    const responseTime = Date.now();
    this.responses.push({
      userId,
      timeTaken: responseTime,
      answer,
    });
  
    if (this.responses.length === 3) {
      const sortedResponses = this.responses.sort(
        (a, b) => a.timeTaken - b.timeTaken
      );
      const winner = sortedResponses[0];
      const losers = sortedResponses.slice(1);
  
      return {
        winner: {
          userId: winner.userId,
          answer: winner.answer,
          timeTaken: winner.timeTaken - this.questionStartTime,
        },
        losers: losers.map((loser) => ({
          userId: loser.userId,
          answer: loser.answer,
          timeTaken: loser.timeTaken - this.questionStartTime,
        })),
      };
    }
    return null;
  }
  
}
