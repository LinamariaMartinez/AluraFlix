import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 8rem;
  color: #e74c3c;
  margin: 0;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(231, 76, 60, 0.5);

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  color: #61dafb;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackButton = styled(Link)`
  padding: 12px 24px;
  background-color: #61dafb;
  color: #20232a;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #21a1f1;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(97, 218, 251, 0.3);
  }
`;

function NotFound() {
  return (
    <Container>
      <ErrorTitle>404</ErrorTitle>
      <ErrorMessage>Página no encontrada</ErrorMessage>
      <ErrorDescription>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </ErrorDescription>
      <BackButton to="/">Volver al Inicio</BackButton>
    </Container>
  );
}

export default NotFound;
