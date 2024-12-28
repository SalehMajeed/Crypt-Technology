import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, #0000, #020230),
    url(https://images.news18.com/ibnlive/uploads/2021/08/whatsapp-image-2021-08-24-at-08.55.58-e1629793241775.jpeg)
      100%;
  display: flex;
  flex-direction: column;
  width: 75%;
  align-items: center;
  background-color: #000;
  height: 100vh;
  width: 100vw;
`;

export const CardWrapper = styled.div`
  width: 75%;
  width: 800px;
  max-width: 90%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  margin-top: 20px;

  .answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin-top : 50px;
  }

  .answers button {
    background: linear-gradient(#0e0124, #061161);
    border: 1px solid #ffa800;
    border-radius: 25px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 300;
    margin: 0 10px 20px;
    padding: 10px;
    text-align: center;
    width: 40%;
  }

  .question {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-wrap: wrap;
    break-word: all;
  }

  p {
    background: linear-gradient(#100241, #000);
    border: 2px solid #ffa800;
    border-radius: 35px;
    font-size: 15px;
    padding: 20px;
    text-align: center;
    width: 80%;
    z-index: 10;
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

export const Button = styled.button`
  background: ${({ success, secondary }) =>
    success ? "#28a745" : secondary ? "#6c757d" : "transparent"};
  color: ${({ success, secondary }) =>
    success || secondary ? "white" : "lightgray"};
  border: ${({ success, secondary }) =>
    success || secondary ? "none" : "1px solid lightgray"};
  padding: ${({ small }) => (small ? "8px 15px" : "20px")};
  margin-bottom: 8px;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  max-width: ${({ small }) => (small ? "120px" : "none")};
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.1s;

  &:hover {
    color: #0f0f0f;
    transition: 0.1s ease-in all;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top : 25px;
`;
