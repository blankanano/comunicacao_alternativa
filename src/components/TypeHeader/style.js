import styled from "styled-components";

export const TypeHeader = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.path === "create" ? "center" : "space-between"};
  align-items: center;
  margin: 8px 20px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.08px;
  text-transform: capitalize;

  h5,
  span {
    font-size: inherit;
    margin: 0;
    padding: 8px 0;
  }
`;
