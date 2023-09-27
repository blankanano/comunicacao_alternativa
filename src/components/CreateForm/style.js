import styled from "styled-components";

export const Form = styled.form`
  margin: 14px 40px 40px 40px;
  min-height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  min-height: 100%;
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
`;
