import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(https://www.spiretech.in/assets/images/banner2.png)
    center/cover;
  height: 100vh;
  width: 100vw;
`;

export const Pera = styled.h2`
  align-items: center;
  text-align:center;
  color: white;
  font-size: 2.5rem;
  border-bottom:2px solid;
  padding:10px;
  margin: 0 auto;
`;

export const CardWrapper = styled.div`
  width: 800px;
  max-width: 90%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 0.7px solid rgba(255, 255, 255, 0.3);
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
  padding: 15px 35px;
  margin: 20px;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1.2rem;
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
// =================================
