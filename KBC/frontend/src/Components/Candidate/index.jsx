import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Candidate = () => {
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("");
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        console.log('ionn');
        if(!socket) {
            setSocket(newSocket);
            return;
        }
        socket.on("new_question", (data) => {
          if (data) {
            console.log("New question received:", data);
            setQuestion(data);
            setResult("");
          } else {
            console.error("No question received from server.");
          }
        });
    
        socket.on("result", (data) => {
            console.log("Received result:", data);
            setResult(data.winner ? "You won!" : "You lost.");
        });
    
        return () => {
          socket.off("question");
          socket.off("result");
          socket.disconnect();
        };
      }, [socket]);
    

    const submitAnswer = () => {
        const time = Date.now();
        if (answer.trim()) {
            socket.emit("submit_answer", { answer, time });
            setAnswer("");
        } else {
            alert("Please provide an answer.");
        }
    };

    return (
        <div>
            <h1>Candidate Panel</h1>
            {question ? (
                <>
                    <p>{question.text}</p>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button onClick={submitAnswer}>Submit Answer</button>
                </>
            ) : (
                <p>Waiting for the next question...</p>
            )}
            {result && <p>{result}</p>}
        </div>
    );
};

export default Candidate;
