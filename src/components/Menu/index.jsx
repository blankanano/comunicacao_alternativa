import React, { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import * as S from "./style";
import { logout } from "../../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { firebaseApp } from "../../utils/firebase.config";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  React.useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const goTo = (path) => {
    if (currentPath !== path) navigate(path);
  };
  const verifyPath = () => {
    if (currentPath === "/category/create") {
      return false;
    } else if (currentPath.indexOf("edit") > 0) {
      return false;
    }
    return true;
  };

  return (
    <S.Container path={verifyPath()}>
      {verifyPath() ? (
        <>
          <S.Header>
            <div>Comunicação Alternativa</div>
            <PowerSettingsNewIcon
              onClick={() => logout(firebaseApp, navigate)}
            />
          </S.Header>
          <S.MenuList>
            <S.MenuIcon path={currentPath === "/"} onClick={() => goTo("/")}>
              <HomeIcon />
            </S.MenuIcon>
            <S.MenuIcon
              path={currentPath === "/category"}
              onClick={() => goTo("/category")}
            >
              <LibraryBooksIcon />
            </S.MenuIcon>
          </S.MenuList>
        </>
      ) : (
        <S.Header>
          <ArrowBackIosIcon onClick={() => navigate("/category")} />
          <div>
            {currentPath.indexOf("edit") > 0 ? "Editar" : "Criar"} Categoria
          </div>
          <div></div>
        </S.Header>
      )}
    </S.Container>
  );
}

export default Menu;
