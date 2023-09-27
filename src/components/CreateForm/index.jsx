import React from "react";
import * as S from "./style";

function CreateForm() {
  const [name, setName] = React.useState("");
  const [photo, setPhoto] = React.useState();
  console.log(photo);
  const type = window.location.pathname.includes ? "Categoria" : "Imagem";

  function handleChange(e) {
    console.log(e.target.files);
    setPhoto(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <S.Form>
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
          </S.InputGroup>
        </S.Group>
        <button>aaaaaa</button>
      </S.Content>
    </S.Form>
  );
}

export default CreateForm;
