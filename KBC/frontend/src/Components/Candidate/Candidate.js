import React, { useState, useEffect } from "react";
import { Container, CardWrapper, Header, Button, Footer } from "./Candidate.styles";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Candidate() {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const initializeSocket = () => {
    if (socket) return; // Prevent initializing if the socket is already connected

    const socketInstance = io("http://localhost:3001");

    socketInstance.on("connect", () => {
      console.log("WebSocket connected successfully with ID:", socketInstance.id);
      socketInstance.emit("join", { role: "candidate" });
    });

    socketInstance.on("quiz-status", (message) => {
      if (message.state === "started") {
        console.log("Quiz started! Navigating to the live page...");
        navigate("/live"); // Navigate to the live page
      }
    });

    // socketInstance.on("disconnect", () => {
    //   console.log("Socket.IO disconnected");
    // });

    setSocket(socketInstance); // Save the socket instance
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
        console.log("WebSocket closed on component unmount");
      }
    };
  }, [socket]);

  return (
    <Container>
      <CardWrapper>
        <Header>
          <h1>Welcome to the Quiz Participant</h1>
          <p>Let's test your knowledge!</p>
        </Header>
        <Footer>
          <Button onClick={initializeSocket}>JOIN</Button>
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Candidate;
