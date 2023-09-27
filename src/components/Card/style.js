import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--color-blue-light);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-blue-light);
  padding: 14px 12px;

  span {
    font-size: 14px;
    font-weight: 600;
    line-height: 15px;
    text-transform: capitalize;
    letter-spacing: 1.12px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    padding: 4px;
    border-radius: 6px;
    background-color: var(--color-blue-light);
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 150px;
    max-height: 88px;
    object-fit: contain;
  }
`;
