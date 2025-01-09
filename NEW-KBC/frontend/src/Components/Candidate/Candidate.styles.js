import styled from "styled-components";

export const Pera = styled.h2`
  width: 20%;
  margin: 10px auto;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 2rem;
`;

export const Question = styled.p`
  background: linear-gradient(#100241, #000);
  border: 1px solid #ffa800;
  border-radius: 35px;
  font-size: 15px;
  padding: 20px;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  font-size: 1.8rem;
  color: white;
`;

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #0000, #020230),
    url(https://images.news18.com/ibnlive/uploads/2021/08/whatsapp-image-2021-08-24-at-08.55.58-e1629793241775.jpeg)
      no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  width: 75%;
  align-items: center;
  background-color: #000;
  height: 100vh;
  width: 100vw;
  font-family: "Poppins", sans-serif;
`;

export const CardWrapper = styled.div`
  height: 100vh;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  font-size: 1.8rem;

  .options {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    margin: 30px auto;
    text-align: center;
    justify-content: center;
    width: 100%;
  }

  .submitBtnDiv {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
  }

  .question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    word-break: break-word;
    margin-bottom: 20px;
  }

  .elementsDiv {
    margin-top: 50px;
    justify-content: center;
    align-items: center;
  }

  .sideBar {
    background: #020230;
    align-items: center;
    text-align: center;
  }

  li {
    display: flex;
    border-bottom: 1px solid #ffa800;
    justify-content: space-between;
    background: #020230;
    padding: 8px;
    color: white;
    text-align: center;
    font-size: 1.7rem;
    font-weight: 400;
    margin: 10px;
  }

  li:hover {
    background-color: #ffa800;
    border-radius: 5px;
  }

  .indexOfPrice {
    width: 20%;
  }
  .price {
    width: 100%;
  }

  .lifeLine {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .expertLifeLine {
    height: 73px;
  }

  img {
    height: 80px;
    height: 80px;
  }

  p {
    background: linear-gradient(#100241, #000);
    border: 1px solid #ffa800;
    border-radius: 35px;
    font-size: 15px;
    padding: 20px;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    font-size: 1.8rem;
  }

  button.submit-btn {
    background: linear-gradient(#100241, #000);
    border: 1px solid #ffa800;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px auto 0;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    width: 250px;
    font-weight: 400;
    color: green;
    &:hover {
      background: #000;
      transform: scale(1.05);
    }
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content:space-around;
  background: linear-gradient(#100241, #000);
  border: 2px solid #ffa800;
  border-radius: 35px;
  color: white;
  font-weight: 300;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 90%;
  min-width: max-content;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #000;
    transform: scale(1.05);
  }

  &.selected {
    background: lightblue;
    color: black;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    color: #666;
  }
`;
export const Header = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }

  h6 {
    margin-bottom: 16px;
  }
`;

export const TimerCircle = styled.div`
  background-color: #121212;
  border: 2px solid #ffa800;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: white;
    margin: 0;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 25px;
`;
