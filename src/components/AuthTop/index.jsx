import React from "react";
import styled from "styled-components";

function AuthTop() {
  return (
    <Container>
      <h1>Comunicação Alternativa</h1>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 56px;
  margin: 124px 0 80px 0;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
`;

export default AuthTop;
