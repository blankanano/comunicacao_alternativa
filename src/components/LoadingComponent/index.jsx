import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingScreen>
      <Scroll />
    </LoadingScreen>
  );
}

export default Loading;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Scroll = styled.div`
  content: "";
  width: 100px;
  height: 100px;
  border: 8px solid var(--color-blue-light);
  border-top: 8px solid var(--color-blue-dark);
  border-radius: 50%;
  animation: spin 1s infinite;
  -webkit-animation: spin 1s infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
