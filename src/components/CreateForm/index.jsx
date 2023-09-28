import React from "react";
import * as S from "./style";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createCategory } from "../../utils/auth";
import { firebaseApp } from "../../utils/firebase.config";

function CreateForm() {
  const [name, setName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("id"));
  // const [id, setId] = React.useState();
  const type = window.location.pathname.includes ? "Categoria" : "Imagem";
  const navigate = useNavigate();
  React.useEffect(() => {});

  function handleChange(e) {
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !photoURL) return;
    await createCategory(firebaseApp, { name, photoURL });
    navigate("/category");
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate("/category");
  };

  return (
    <S.Form onSubmit={(e) => handleCreate(e)}>
      <S.Content>
        <S.Group>
          <S.InputGroup>
            <label htmlFor="name">Nome da {type}</label>
            <input
              id="name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder={`Nome da ${type}`}
            />
          </S.InputGroup>
          <S.InputGroup>
            <label htmlFor="photo">Nome da {type}</label>
            <input
              id="photo"
              type="file"
              onChange={(e) => handleChange(e)}
              placeholder={`Nome da ${type}`}
            />
            <img src={photoURL} alt="" />
          </S.InputGroup>
        </S.Group>
        <S.ButtonGroup>
          <button onClick={(e) => goBack(e)}>Cancelar</button>
          <button onClick={(e) => handleCreate(e)}>Salvar</button>
        </S.ButtonGroup>
      </S.Content>
    </S.Form>
  );
}

export default CreateForm;
