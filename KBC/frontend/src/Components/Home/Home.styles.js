import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  gap:25px;
  background:url(https://www.spiretech.in/assets/images/banner2.png); 
   background-position: center;
    background-size: cover;
  height: 100vh;
  width: 100vw;
`;

export const Pera = styled.p`
font-size: ${props => props.size ? props.size : 1.5}rem;
    color: rgba(255, 255, 255, 0.6);
`;

export const Heading = styled.h1`
font-size: 4rem;
color: white;
`;

export const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#6c757d" : "#28a745")};
  color: white;
  padding: 10px 22px;
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

// export const InnerContainer = styled.div`
// display:flex;
// gap:15px;
// align-item:center;
// flex-direction: ${props => props.dira ? props.dira : 'row'}
// `