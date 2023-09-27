import React from "react";
import * as S from "./style";
function TypeHeader({ type, url, navigate }) {
  return (
    <S.TypeHeader path={url}>
      {url === "create" ? (
        <h5 onClick={() => navigate(url)}>+{type}</h5>
      ) : (
        <>
          <h5>{type}</h5>
          <span onClick={() => navigate(url)}>Ver todos</span>
        </>
      )}
    </S.TypeHeader>
  );
}

export default TypeHeader;
