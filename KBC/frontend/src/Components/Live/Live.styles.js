import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  height: 100vh;
  width: 100vw;
`;

export const CardWrapper = styled.div`
  background-color: #2e004a;
  width: 800px;
  max-width: 90%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
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
  border: 2px solid green;
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
  padding: ${({ small }) => (small ? "6px 12px" : "12px")};
  margin-bottom: 8px;
  text-align: ${({ centered }) => (centered ? "center" : "left")};
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  max-width: ${({ small }) => (small ? "120px" : "none")};

  &:hover {
    background-color: #20c997;
    color: #0f0f0f;
    opacity: 0.9;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
