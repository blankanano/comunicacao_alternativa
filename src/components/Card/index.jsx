import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import * as S from "./style";

function Card({ itemId, name, photo, baseCategory, callModal, callEdit }) {
  return (
    <S.Container>
      <S.CardHeader>
        <span>{name}</span>
        {baseCategory ? (
          <div />
        ) : (
          <DeleteIcon onClick={() => callModal({ id: itemId, name })} />
        )}
      </S.CardHeader>
      <S.CardContent>
        <S.Image>
          <img src={photo} alt="" />
        </S.Image>
        {baseCategory ? <div /> : <EditIcon onClick={() => callEdit(itemId)} />}
      </S.CardContent>
    </S.Container>
  );
}

export default Card;
