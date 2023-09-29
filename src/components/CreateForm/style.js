import styled from "styled-components";

export const Form = styled.form`
  margin: 14px 40px 40px 40px;
  min-height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 86vh;
  justify-content: space-between;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div:last-child input {
    height: 200px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  input {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 12px 15px 15px 15px;
    background-color: var(--color-blue-light);
    border-radius: 4px;
    border: none;
  }

  img {
    position: absolute;
    width: 250px;
    height: 175px;
    top: 70px;
    left: 16px;
    object-fit: contain;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    font-size: 18px;
    padding: 10px 31px;
    background-color: var(--color-blue-light);
    border: none;
    border-radius: 8px;
  }
`;
