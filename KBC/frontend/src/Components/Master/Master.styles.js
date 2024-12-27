import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right,
    #000428,
    #004e92
  ); 
  height: 100vh;
  width: 100vw;
`;

export const CardWrapper = styled.div`
  background-color: #2e004a;
  width: 800px;
  max-width: 90%;
  padding: 32px; 
  border-radius: 12px; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
`;

export const Header = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem; 
    color: #ddd; 
  }
`;

export const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#6c757d" : "#28a745")};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #6c757d;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;
