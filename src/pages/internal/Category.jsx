import React from "react";
import { Card, TypeHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataModel } from "../../data/datamodel";
import { firebaseApp } from "../../utils/firebase.config";
import { userIsLoggedIn } from "../../utils/auth";

async function getUser() {
  const user = await userIsLoggedIn(firebaseApp);
  return user;
}

function Category({ isHome = false }) {
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(
    () => async () => {
      const user = await getUser();
      if (user) {
        const uid = user.uid;
        const dataModel = new DataModel("category", firebaseApp);
        const data = await dataModel.getLocalData(uid);
        setCategories(data.category);
      }
    },
    []
  );
  return (
    <>
      {isHome ? (
        <TypeHeader type="Categorias" url="category" navigate={navigate} />
      ) : (
        <TypeHeader type="Categoria" url="create" navigate={navigate} />
      )}
      <Container>
        {categories &&
          categories.map((item) => (
            <Card
              key={`${item.name}_${item.id}`}
              id={item.id}
              name={item.name}
              photo={item.photo}
            />
          ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 20px;
  gap: 20px;
`;

export default Category;
