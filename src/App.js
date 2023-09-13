import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, useState } from "react";
import Loading from "./components/Loading";
import routes from "./routes";

const routesWithoutMenu = ["/"];
const loggoutRoutes = ["/login", "/register", "/recovery-password"];

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={`${idx}_rotas`}
              exact
              path={route.path}
              element={
                <route.element
                  loggoutRoutes={loggoutRoutes}
                  setCurrentPath={setCurrentPath}
                />
              }
            />
          ))}
        </Routes>
      </Suspense>
      <br></br>
      {!routesWithoutMenu.includes(currentPath)
        ? routes.map((route, idx) => {
            if (route.tab) {
              return (
                <Link key={`${idx}_menu`} to={route.path}>
                  {route.title}
                </Link>
              );
            }
            return null;
          })
        : null}
    </Router>
  );
}

export default App;
