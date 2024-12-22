import {
    distributeQuestionToCandidates,
    resetCandidates,
    loadNextQuestionForCandidates,
  } from "../Services/questionService.js";
  
  const questionController = {
    distributeQuestion: (req, res) => {
        const success = distributeQuestionToCandidates();
        if (success) {
            res.json({ message: "Question distributed to candidates." });
        } else {
            res.status(400).json({ message: "No more questions available." });
        }
    },
  
    reset: (req, res) => {
        resetCandidates();
        res.json({ message: "All candidates have been reset." });
    },
  
    loadNextQuestion: (req, res) => {
        const success = loadNextQuestionForCandidates();
        if (success) {
            res.json({ message: "Next question loaded." });
        } else {
            res.status(400).json({ message: "No more questions available." });
        }
    },
  };
  
  export default questionController;
  