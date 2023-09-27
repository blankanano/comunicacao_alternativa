import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { DataModel } from "../data/datamodel";
import baseCategories from "../data/basedata";

export const userIsLoggedIn = async (firebaseApp) => {
  const dataModel = new DataModel("user", firebaseApp);
  const user = await dataModel.getLocalUser();
  if (user.length > 0) {
    return user[0];
  }
  return null;
};

const verifyLogin = async (currentPath, navigate, firebaseApp) => {
  const needLoginRoutes = ["/", "/category", "/image", "/category/create"];
  const loggoutRoutes = ["/login", "/register", "/recovery-password"];
  const isLoggedIn = await userIsLoggedIn(firebaseApp);
  if (!!isLoggedIn && loggoutRoutes.includes(currentPath)) {
    navigate("/");
    return true;
  }
  if (needLoginRoutes.includes(currentPath) && !!isLoggedIn) {
    return true;
  } else if (!loggoutRoutes.includes(currentPath)) {
    navigate("/login");
    return false;
  }
  return false;
};

const saveLogin = (firebaseApp, data) => {
  const dataModel = new DataModel("user", firebaseApp);
  dataModel.createLocal(data, data.uid);
};

const login = async (firebaseApp, email, password, navigate) => {
  const data = { email, password };
  try {
    const auth = getAuth(firebaseApp);
    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const { email, displayName, photoURL, uid, accessToken } = response.user;
    saveLogin(firebaseApp, {
      email,
      displayName,
      photoURL,
      uid,
      accessToken,
    });
    navigate("/");
  } catch (e) {
    if (e.toString().indexOf("auth/invalid-email") > -1) {
      alert("Dados de usuário inválidos.");
    } else {
      alert(e.toString());
    }
  }
};

const register = async (firebaseApp, email, password, navigate) => {
  const data = { email, password };
  try {
    const auth = getAuth(firebaseApp);
    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const { email, displayName, emailVerified, photoURL, uid } = response.user;
    await saveUserInDatabase(firebaseApp, {
      email,
      displayName,
      emailVerified,
      photoURL,
      uid,
    });
    alert("Usuário cadatrado com sucesso. Verifique sua caixa de mensagem.");
    navigate("/login");
  } catch (e) {
    if (e.toString().indexOf("auth/invalid-email") > -1) {
      alert("E-mail inválido.");
    } else if (e.toString().indexOf("auth/wrong-password") > -1) {
      alert("Password Inválido.");
    } else if (e.toString().indexOf("auth/weak-password") > -1) {
      alert("A senha precisa ter 6 ou mais caractéres.");
    } else {
      alert(e.toString());
    }
  }
};

const logout = async (firebaseApp, navigate) => {
  const dataModel = new DataModel(null, firebaseApp);
  dataModel.clearDatabase(["user"]);
  const auth = getAuth(firebaseApp);
  signOut(auth);
  navigate("/login");
};

const saveUserInDatabase = async (firebaseApp, user) => {
  const userDataModel = new DataModel("user", firebaseApp);
  userDataModel.create(user);
  const categoryDataModel = new DataModel("category", firebaseApp);
  categoryDataModel.create({ category: baseCategories, uid: user.uid }, true);
};

export { verifyLogin, login, logout, register };
