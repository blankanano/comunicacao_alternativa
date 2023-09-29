import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import * as S from "./style";
import {
  createCategory,
  updateCategory,
  userIsLoggedIn,
} from "../../utils/auth";
import { firebaseApp, storage } from "../../utils/firebase.config";
import { DataModel } from "../../data/datamodel";

async function getUser() {
  const user = await userIsLoggedIn(firebaseApp);
  return user;
}

function CreateForm() {
  const [name, setName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState();
  const [searchParams] = useSearchParams();
  const [editObject, setEditObject] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const type = window.location.pathname.includes ? "Categoria" : "Imagem";
  const navigate = useNavigate();

  React.useEffect(
    () => async () => {
      const editId = searchParams.get("id");
      if (editId) {
        const user = await getUser();
        const dataModel = new DataModel("category", firebaseApp);
        const objectToEdit = await dataModel.getLocalDataById(user.uid, editId);
        setEditObject(objectToEdit[0]);
        setName(objectToEdit[0].name);
        setPhotoURL(objectToEdit[0].photoURL);
      }
      setIsLoading(false);
    },
    [searchParams]
  );

  function handleChange(e) {
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const file = e.target[1]?.files[0];
    const user = await getUser();
    if (!user) return;
    if (!name || !photoURL) return;

    if (editObject) {
      await updateCategory(
        firebaseApp,
        { name, id: editObject.id, photoURL },
        file,
        storage
      );
      navigate("/category");
    } else {
      await createCategory(firebaseApp, { name, photoURL }, file, storage);
      navigate("/category");
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate("/category");
  };

  return (
    !isLoading && (
      <S.Form onSubmit={(e) => handleSubmit2(e)}>
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
            <button type="submit">Salvar</button>
          </S.ButtonGroup>
        </S.Content>
      </S.Form>
    )
  );
}

export default CreateForm;
