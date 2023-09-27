import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import * as S from "./style";

function Card({ id, name, photo }) {
  return (
    <S.Container>
      <S.CardHeader>
        <span>{name}</span>
        <DeleteIcon />
      </S.CardHeader>
      <S.CardContent>
        <S.Image>
          <img src={photo} alt="" />
        </S.Image>
        <EditIcon />
      </S.CardContent>
    </S.Container>
  );
}

export default Card;
