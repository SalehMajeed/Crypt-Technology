export class QuizService {
  constructor() {
    this.questions = [];  // Store questions
    this.activeUsers = [];
    this.responses = [];
    this.currentQuestion = null;
    this.questionStartTime = null;
    this.masterConnected = false;
  }

  addUser(userId, role) {
    if (role === "master") {
      if (this.masterConnected) {
        return { error: "Only one master is allowed!" };
      }
      this.masterConnected = true;
    } else if (role === "candidate") {
      if (this.activeUsers.length >= 3) {
        return { error: "No more users allowed!" };
      }
    }

    this.activeUsers.push(userId);

    if (this.activeUsers.length === 3) {
      // Notify master that all candidates have joined
      return { success: true, candidateData: this.activeUsers };
    }

    return { success: true };
  }

  removeUser(userId) {
    this.activeUsers = this.activeUsers.filter((id) => id !== userId);
    if (this.activeUsers.length === 0) {
      this.masterConnected = false;
    }
  }

  startQuiz() {
    if (this.activeUsers.length < 3) {
      return { error: "Not enough users to start the quiz!" };
    }

    if (this.questions.length === 0) {
      return { error: "No questions available!" };
    }

    this.currentQuestion = this.questions[0];
    this.responses = [];
    this.questionStartTime = Date.now();

    return {
      question: this.currentQuestion,
      startTime: this.questionStartTime,
    };
  }

  recordResponse(userId, answer, responseTime) {
    if (!this.currentQuestion || !this.currentQuestion.correctAnswer) {
      return { error: "Current question is not defined or missing correct answer!" };
    }
  
    const isCorrect = answer === this.currentQuestion.correctAnswer;
  
    const response = {
      userId,
      answer,
      responseTime,
      isCorrect,
    };
  
    // Store the response in the array
    this.responses.push(response);
  
    // Immediately log the response
    console.log("Response recorded:", response);
  
    if (isCorrect) {
      const correctResponses = this.responses.filter((res) => res.isCorrect);
      const fastestCorrect = correctResponses.reduce((prev, current) =>
        prev.responseTime < current.responseTime ? prev : current
      );
  
      return {
        status: "correct",
        userId: fastestCorrect.userId,
        responseTime: fastestCorrect.responseTime,
      };
    } else {
      return {
        status: "incorrect",
        userId,
      };
    }
  }
  
  
  getFastestCorrectAnswer() {
    if (!this.currentQuestion) {
      console.error("Current question is not set.");
      return null;
    }

    const correctResponses = this.responses.filter(
      (response) => response.answer === this.currentQuestion.correctAnswer
    );

    if (correctResponses.length === 0) {
      return null;
    }

    const fastestCorrect = correctResponses.reduce((prev, current) =>
      prev.responseTime < current.responseTime ? prev : current
    );
    return fastestCorrect;
  }
}
