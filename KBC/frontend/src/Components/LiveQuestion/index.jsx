import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const LiveQuestion = () => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const socket = io("http://localhost:3000");

    useEffect(() => {
        socket.on("new_question", (data) => {
            setCurrentQuestion(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [1]);

    return (
        <div>
            <h1>Live Question Viewer</h1>
            {currentQuestion ? (
                <div>
                    <h2>Question: {currentQuestion.text}</h2>
                </div>
            ) : (
                <p>Waiting for a question...</p>
            )}
        </div>
    );
};

export default LiveQuestion;
