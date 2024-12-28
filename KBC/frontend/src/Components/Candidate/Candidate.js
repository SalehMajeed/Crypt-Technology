import React, { useState } from "react";
import {
  Container,
  CardWrapper,
  Header,
  Button,
  Footer,
} from "./Candidate.styles";
import { useNavigate, Link} from "react-router-dom";

function Candidate() {
  const [ws, setWs] = useState(null)
  const navigate = useNavigate()
  const handleRoute = async () => {
    if (ws) return
    const socket = new window.WebSocket('ws://localhost:3002/')

    socket.onopen = () => {
      console.log("WebSocket connected successfully");

      if (socket instanceof WebSocket) {
        socket.send(JSON.stringify({ role: "candidate" }));
      } else {
        console.error("WebSocket instance is invalid");
      }

      startPolling(socket);
    };

    socket.onmessage = (event) => {
      console.log(event.data);

      const message = JSON.parse(event.data);

      if (message.type === "quiz-status" && message.state === "started") {
        console.log("Quiz started! Navigating to the live page...");
        navigate("/"); 
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    setWs(socket); 
  };

  const startPolling = (socket) => {
    console.log("Starting polling...");

    const interval = setInterval(() => {
      console.log("Polling for quiz status...");

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "check-quiz-status" }));
      } else {
        console.error("WebSocket is not open or valid");
      }
    }, 5000);

    socket.onclose = () => {
      clearInterval(interval);
      console.log("Polling stopped due to WebSocket disconnect.");
    };
  };


  return (
    <Container>
      <CardWrapper>
        <Header>
          <h1>Welcome to the Quiz participant</h1>
          <p>Let's test your knowledge!</p>
        </Header>

        <Footer>
          <Link to='/live'>
            <Button onClick={handleRoute}>JOIN</Button>
          </Link>
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Candidate;
