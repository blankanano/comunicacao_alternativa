import { lazy } from "react";

const Home = lazy(() => import("./pages/internal/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/external/Login"));
const RecoveryPassword = lazy(() =>
  import("./pages/external/RecoveryPassword")
);
const Register = lazy(() => import("./pages/external/Register"));

const routes = [
  { path: "/", element: Home, title: "Home", tab: true },
  { path: "/login", element: Login, title: "Login" },
  { path: "/register", element: Register, title: "Registro" },
  {
    path: "/recovery-password",
    element: RecoveryPassword,
    title: "Recuperar Senha",
  },
  { path: "*", element: NotFound, title: "Página não encontrada" },
];

export default routes;
