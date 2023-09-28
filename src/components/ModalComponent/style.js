import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Modal = styled.div`
  margin: 16px 20px;
  padding: 14px 16px;
  background-color: var(--color-blue-light);
  border-radius: 16px;
  font-size: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
  }

  button {
    font-size: 18px;
    border: none;
    padding: 12px 20px;
    border-radius: 6px;
    background-color: var(--color-blue-medium);
  }
`;

export const Divider = styled.div`
  content: "";
  width: 2px;
  border-radius: 2px;
  background-color: var(--color-blue-dark);
`;
