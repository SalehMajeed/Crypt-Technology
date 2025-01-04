import React, { useEffect, useState } from "react";
import { Container, CardWrapper, Header, Button, Footer } from "./Master.styles";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Master() {
  const navigate = useNavigate();
  const [quizStatus, setQuizStatus] = useState("Not started");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection only once
    const socketInstance = io("http://localhost:3001");

    socketInstance.on("connect", () => {
      console.log("master connected with ID:", socketInstance.id);
      socketInstance.emit("join", { role: "master" });
    });

    socketInstance.on("quizStatus", (status) => {
      setQuizStatus(status);
    });

    // socketInstance.on("disconnect", () => {
    //   console.log("Disconnected from Socket server");
    // });

    // Save the socket instance
    setSocket(socketInstance);

    // Cleanup function to close the socket when the component unmounts
    return () => {
      socketInstance.off("connect");
      socketInstance.off("quizStatus");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  const startQuiz = () => {
    if (socket) {
      socket.emit("start-quiz", {}, (response) => {
        if (response.success) {
          setQuizStatus("Quiz started");
          alert("Quiz is now started!");
        } else {
          alert(response.error);
        }
      });      
    }
  };

  return (
    <Container>
      <CardWrapper>
        <Header>
          <h1>Welcome to the Quiz Master Page</h1>
          <p>Start the quiz and challenge your participants!</p>
        </Header>

        <Footer>
          <Button onClick={startQuiz}>Start</Button>
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Master;
