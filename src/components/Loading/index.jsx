import React from "react";
import styled from "styled-components";

function Loading() {
  return <LoadingScreen></LoadingScreen>;
}

export default Loading;

const LoadingScreen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
