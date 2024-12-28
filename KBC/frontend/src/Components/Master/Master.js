import React from "react";
import {
  Container,
  CardWrapper,
  Header,
  Button,
  Footer,
} from "./Master.styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Master() {
  const navigate = useNavigate()
  const handleRoute = async () => {
    try{
      let ws = new WebSocket('ws://localhost:3002/')
   
      ws.onopen = ()=>{
       console.log('web socket connected successfully')
   
       ws.send(JSON.stringify({role:'master'}))
      } 
   
      ws.send(JSON.stringify({type:'start-quiz'}))
    }catch(err){
      console.log(err)
    }finally{
      // navigate('/live')
      alert('quiz is now started')
    }

   
  }
  return (
    <Container>
      <CardWrapper>
        <Header>
          <h1>Welcome to the Quiz Master Page</h1>
          <p>Start the quiz and challenge your participants!</p>
        </Header>

        <Footer>
          <Button onClick={handleRoute}> Start</Button>
        </Footer>
      </CardWrapper>
    </Container>
  );
}

export default Master;
