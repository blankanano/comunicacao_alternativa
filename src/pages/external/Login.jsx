import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, verifyLogin } from "../../utils/auth";
import { Box } from "@mui/material";
import { ButtonComponent, TextFieldComponent } from "../../components";

function Login({ setCurrentPath, loggoutRoutes }) {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    verifyLogin(loggoutRoutes, window.location.pathname, navigate);
  }, []);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrarNoApp() {
    login({ email, senha }, navigate);
  }

  return (
    <>
      <Box
        component="div"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate={true}
        autoComplete={"off"}
      >
        <TextFieldComponent
          variant="filled"
          fullWidth={true}
          label="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box
        component="div"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate={true}
        autoComplete={"off"}
      >
        <TextFieldComponent
          variant="filled"
          fullWidth={true}
          label="Password"
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
      </Box>
      <Box
        component="div"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate={true}
        autoComplete={"off"}
      >
        <ButtonComponent
          fullWidth={true}
          label="Entrar"
          onClick={entrarNoApp}
        />
      </Box>
    </>
  );
}

export default Login;
