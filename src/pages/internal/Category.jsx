import React from "react";
import { Card, ModalComponent, TypeHeader } from "../../components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DataModel } from "../../data/datamodel";
import { firebaseApp, storage } from "../../utils/firebase.config";
import { userIsLoggedIn, deleteFile } from "../../utils/auth";

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

function Category({ isHome = false, setLoading }) {
  const [categories, setCategories] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState();
  const navigate = useNavigate();
  React.useEffect(
    () => async () => {
      setLoading(true);
      await searchCategories(setCategories);
      setLoading(false);
    },
    [setLoading]
  );
  const onHandlerDelete = async () => {
    setLoading(true);
    const dataModel = new DataModel("category", firebaseApp);
    await dataModel.deleteLocal(itemToDelete.id);
    await deleteFile(firebaseApp, storage, itemToDelete);
    await searchCategories(setCategories);
    onCloseModal();
    setLoading(false);
  };
  const callModalDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };
  const onCloseModal = () => setShowModal(false);
  const callEditScreen = (id) => navigate(`/edit/category?id=${id}`, {});
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
