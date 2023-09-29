import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonComponent,
  TextFieldComponent,
  BoxComponent,
  AuthTop,
} from "../../components";
import { InputAdornment, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { login } from "../../utils/auth";

function Login({ setCurrentPath, loggoutRoutes, firebaseApp }) {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [navigate, setCurrentPath, loggoutRoutes]);

  const [email, setEmail] = useState("teste2@teste.com");
  const [senha, setSenha] = useState("12345678");

  function entrarNoApp() {
    login(firebaseApp, email, senha, navigate);
  }

  return (
    <>
      <AuthTop />
      <div
        style={{
          margin: "0 32px",
        }}
      >
        <BoxComponent
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </BoxComponent>
        <BoxComponent
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </BoxComponent>
        <BoxComponent
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
        </BoxComponent>
        <BoxComponent
          component="div"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate={true}
          autoComplete={"off"}
          style={{
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div>Ainda não é cadastrado?</div>
          <Link onClick={() => navigate("/register")}>Cadastre-se</Link>
        </BoxComponent>
      </div>
    </>
  );
}

export default Login;
