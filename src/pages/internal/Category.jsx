import React from "react";
import { Card, ModalComponent, TypeHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataModel } from "../../data/datamodel";
import { firebaseApp } from "../../utils/firebase.config";
import { userIsLoggedIn } from "../../utils/auth";

async function getUser() {
  const user = await userIsLoggedIn(firebaseApp);
  return user;
}

async function searchCategories(setCategories) {
  const user = await getUser();
  if (user) {
    const uid = user.uid;
    const dataModel = new DataModel("category", firebaseApp);
    const data = await dataModel.getLocalData(uid);
    setCategories(data);
  }
}

function Category({ isHome = false }) {
  const [categories, setCategories] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState();
  const navigate = useNavigate();
  React.useEffect(
    () => async () => {
      await searchCategories(setCategories);
    },
    []
  );
  const onHandlerDelete = async () => {
    const dataModel = new DataModel("category", firebaseApp);
    await dataModel.deleteLocal(idToDelete);
    await searchCategories(setCategories);
    onCloseModal();
  };
  const callModalDelete = (id) => {
    setIdToDelete(id);
    setShowModal(true);
  };
  const onCloseModal = () => setShowModal(false);
  const callEditScreen = (id) => navigate(`/create?id=${id}`, {});
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
              itemId={item.id}
              name={item.name}
              photo={item.photo}
              baseCategory={!!!item.photoURL}
              callModal={callModalDelete}
              callEdit={callEditScreen}
            />
          ))}
      </Container>
      <ModalComponent
        open={showModal}
        onConfirm={onHandlerDelete}
        onClose={onCloseModal}
      />
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
