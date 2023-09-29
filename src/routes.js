import { lazy } from "react";

const Home = lazy(() => import("./pages/internal/Home"));
const Category = lazy(() => import("./pages/internal/Category"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/external/Login"));
const Register = lazy(() => import("./pages/external/Register"));
const Create = lazy(() => import("./pages/internal/Create"));

const routes = [
  { path: "/", element: Home, title: "Home" },
  { path: "/category", element: Category, title: "Category" },
  { path: "/category/create", element: Create, title: "Create" },
  { path: "/edit/category", element: Create, title: "Create" },
  { path: "/login", element: Login, title: "Login" },
  { path: "/register", element: Register, title: "Registro" },
  { path: "*", element: NotFound, title: "Página não encontrada" },
];

export default routes;
