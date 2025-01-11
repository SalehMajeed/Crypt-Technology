import styled from "styled-components";

// export const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: url(https://www.spiretech.in/assets/images/banner2.png)
//     center/cover;
//   height: 100vh;
//   width: 100vw;
// `;

// export const CardWrapper = styled.div`
//   ${
//     "" /* width: 800px;
//   max-width: 90%;
//   padding: 32px;
//   border-radius: 12px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
//   border: 0.7px solid rgba(255, 255, 255, 0.3);
//   color: white;
//   text-align: center; */
//   }

//   @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
//   display: flex;
//   justify-content: center;
//   background: linear-gradient(180deg, #0000, #020230),
//     url(https://images.news18.com/ibnlive/uploads/2021/08/whatsapp-image-2021-08-24-at-08.55.58-e1629793241775.jpeg)
//       no-repeat center center;
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
//   width: 75%;
//   align-items: center;
//   background-color: #000;
//   height: 100vh;
//   width: 100vw;
//   font-family: "Poppins", sans-serif;

//   .elementsDiv {
//     display: grid;
//     grid-template-columns: 1fr 300px;
//     height: 100vh;
//   }

//   .sideBar {
//     background: #020230;
//     align-items: center;
//     text-align: center;
//   }

//   li {
//     display: flex;
//     border-bottom: 1px solid #ffa800;
//     justify-content: space-between;
//     background: #020230;
//     padding: 8px;
//     color: white;
//     text-align: center;
//     font-size: 1.7rem;
//     font-weight: 400;
//     margin: 10px;
//   }
// `;

export const Pera = styled.h2`
  align-items: center;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  ${"" /* border-bottom: 2px solid; */}
  padding: 10px;
  margin: 0 auto;
`;

// export const Question = styled.p`
//   background: linear-gradient(#100241, #000);
//   border: 1px solid #ffa800;
//   border-radius: 35px;
//   font-size: 15px;
//   padding: 20px;
//   text-align: center;
//   width: 80%;
//   margin: 0 auto;
//   font-size: 1.8rem;
//   color: white;
// `;

// export const Header = styled.div`
//   margin-bottom: 32px;

//   h1 {
//     font-size: 2.5rem;
//     font-weight: bold;
//   }

//   p {
//     font-size: 1.2rem;
//     color: #ddd;
//   }
// `;

// export const Button = styled.button`
//   background-color: ${({ disabled }) => (disabled ? "#6c757d" : "#28a745")};
//   color: white;
//   padding: 12px 24px;
//   border: none;
//   border-radius: 4px;
//   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
//   font-size: 1rem;
//   transition: background-color 0.3s ease, transform 0.2s ease;

//   &:hover {
//     opacity: 0.9;
//     transform: translateY(-2px);
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   &:disabled {
//     background-color: #6c757d;
//   }
// `;

// export const Footer = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// ======================================

// import styled from "styled-components";
export const Logo = styled.div``;

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #0000, #020230),
    url("https://images.news18.com/ibnlive/uploads/2021/08/whatsapp-image-2021-08-24-at-08.55.58-e1629793241775.jpeg")
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

export const CardWrapper = styled.div`
  height: 100vh;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  font-size: 1.8rem;

  .winner {
    display:flex;
    margin:0 auto;
    align-items:center;
    justify-content:center;
    background-color: green; 
    width:max-content;
    border-radius:30px;
  }

  .winner li{
    margin:0 auto;
    border-radius:30px;
    background-color: green; 
    width:max-content;
  }

  .looser {
    margin:0 auto;
    display:flex;
    justify-content:center;
    background-color: red; 
    border-radius:30px;
    width:max-content;
  }

  .looser li {
    background-color: red; 
    border-radius:30px;
    width:max-content;
  }

  .options {
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    margin: 90px auto 0;
    padding: 10px;
    text-align: center;
    justify-content: center;
    width : 90%;
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
    border-radius:10px;
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
    &:hover {
      background: #000;
      transform: scale(1.05);
    }
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-around;
  background: linear-gradient(#100241, #000);
  border: 2px solid #ffa800;
  border-radius: 35px;
  color: white;
  font-weight: 400;
  font-weight: 300;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  width: 80%;
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
  border: 2px solid yellow;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: #28a745;
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
