import React, { Suspense, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import { firebaseApp } from "./utils/firebase.config";
import { Loading } from "./components";
import routes from "./routes";
import { Menu } from "./components";
import { verifyLogin } from "./utils/auth";
const routesWithoutMenu = ["/login", "/register"];
const loggoutRoutes = ["/login", "/register", "/recovery-password"];

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    setCurrentPath(location);
    verifyLogin(window.location.pathname, navigate, firebaseApp);
  }, [location]);

  return (
    <>
      {!routesWithoutMenu.includes(currentPath) ? <Menu /> : null}
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={`${idx}_rotas`}
                exact
                path={route.path}
                element={
                  <route.element
                    loggoutRoutes={loggoutRoutes}
                    setCurrentPath={setCurrentPath}
                    firebaseApp={firebaseApp}
                    setLoading={setLoading}
                  />
                }
              />
            );
          })}
        </Routes>
      </Suspense>
      {loading && <Loading />}
    </>
  );
}

export default App;
