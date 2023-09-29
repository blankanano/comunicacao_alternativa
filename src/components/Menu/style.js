import styled from "styled-components";

export const Container = styled.div`
  height: ${(props) => (!props.path ? "50px" : "90px")};
  background-color: var(--color-blue-light);
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 13px 6px;

  div {
    font-weight: 600;
    font-size: 18px;
    line-height: 15px;
    letter-spacing: 1.44px;
  }
`;

export const MenuList = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const MenuIcon = styled.div`
  padding: 5px 40px 4px 40px;
  border-bottom: 3px solid ${(props) => (props.path ? "black" : "transparent")};
`;
