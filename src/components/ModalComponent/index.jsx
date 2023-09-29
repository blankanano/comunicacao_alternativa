import React from "react";
import * as S from "./style";
function ModalComponent({ open, onConfirm, onClose }) {
  return (
    open && (
      <S.ContainerModal>
        <S.Modal>
          <div>Deseja deletar essa Categoria?</div>
          <div>
            <button onClick={() => onClose()}>Cancelar</button>
            <S.Divider></S.Divider>
            <button onClick={() => onConfirm()}>Deletar</button>
          </div>
        </S.Modal>
      </S.ContainerModal>
    )
  );
}

export default ModalComponent;
