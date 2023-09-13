import React from "react";
import { logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "../../components";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div>Home</div>
      <br />
      <ButtonComponent
        label="Deslogar"
        onClick={() => logout(navigate)}
      ></ButtonComponent>
    </div>
  );
}

export default Home;
