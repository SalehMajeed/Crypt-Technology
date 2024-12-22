import React from "react";
import {
  Container,
  CardWrapper,
  Header,
  Button,
  Footer,
} from "./Master.styles";
import { Link } from "react-router-dom";

function Master() {
  return (
    <Container>
      <CardWrapper>
        <Header>
          <h1>Welcome to the Quiz Master Page</h1>
          <p>Start the quiz and challenge your participants!</p>
        </Header>

        <Footer>
          <Link to="/live">
            <Button>Start</Button>
          </Link> 
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Master;
