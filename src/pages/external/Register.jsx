import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonComponent,
  TextFieldComponent,
  BoxComponent,
  AuthTop,
} from "../../components";
import { InputAdornment, Link, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { register } from "../../utils/auth";

function Register({ setCurrentPath, loggoutRoutes, firebaseApp }) {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [navigate, setCurrentPath, loggoutRoutes]);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function registerAccount() {
    register(firebaseApp, email, senha, navigate);
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
          <Typography>Criando Conta</Typography>
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
            label="Registra-se"
            onClick={registerAccount}
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
          <div>Já possui uma conta?</div>
          <Link onClick={() => navigate("/login")}>Logar</Link>
        </BoxComponent>
      </div>
    </>
  );
}

export default Register;
