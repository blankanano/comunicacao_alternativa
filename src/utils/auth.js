const userIsLoggedIn = () => {
  const user = window.localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

const verifyLogin = (loggoutRoutes, currentPath, navigate) => {
  const isLoggedIn = userIsLoggedIn();

  if (isLoggedIn && loggoutRoutes.includes(currentPath)) {
    navigate("/");
  } else if (!isLoggedIn && !loggoutRoutes.includes(currentPath)) {
    navigate("/login");
  }
};

const login = (data, navigate) => {
  window.localStorage.setItem("user", JSON.stringify(data));
  navigate("/");
};

const logout = (navigate) => {
  window.localStorage.clear();
  navigate("/login");
};

export { verifyLogin, login, logout };
