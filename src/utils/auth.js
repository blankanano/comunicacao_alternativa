import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { DataModel } from "../data/datamodel";
import baseCategories from "../data/basedata";
import { saveImageB64 } from "./storage";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";

export const userIsLoggedIn = async (firebaseApp) => {
  const dataModel = new DataModel("user", firebaseApp);
  const user = await dataModel.getLocalUser();
  if (user.length > 0) {
    return user[0];
  }
  return null;
};

const verifyLogin = async (currentPath, navigate, firebaseApp) => {
  const needLoginRoutes = [
    "/",
    "/category",
    "/image",
    "/category/create",
    "/edit/category",
  ];
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
  baseCategories.forEach((x) => {
    const categoryDataModel = new DataModel("category", firebaseApp);
    categoryDataModel.create({ category: x, uid: user.uid }, true);
  });
};

const createCategory = async (firebaseApp, data, file, storage) => {
  const user = getAuth(firebaseApp).currentUser;

  if (user) {
    data.photoURL = await convertB64ParaUrl(
      firebaseApp,
      data.photoURL,
      user.uid
    );
    const dataModel = new DataModel("category", firebaseApp);
    data.id = await dataModel.create(
      { category: { ...data, photo: data.photoURL }, uid: user.uid },
      true
    );

    if (window.navigator.onLine) {
      const storageRef = ref(
        storage,
        `category/${user.uid}/${data.id}/${data.name}`
      );
      const uploadCategory = uploadBytesResumable(storageRef, file);

      await uploadCategory.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadCategory.snapshot.ref).then((downloadURL) => {
            data.photoURL = downloadURL;
            updateCategory(firebaseApp, data);
          });
        }
      );
    }
  }
};

const updateCategory = async (
  firebaseApp,
  data,
  file = null,
  storage = null
) => {
  const user = getAuth(firebaseApp).currentUser;
  if (user) {
    if (file) {
      const storageRef = ref(
        storage,
        `category/${user.uid}/${data.id}/${data.name}`
      );
      const uploadCategory = uploadBytesResumable(storageRef, file);

      await uploadCategory.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadCategory.snapshot.ref).then((downloadURL) => {
            data.photoURL = downloadURL;
            updateCategory(firebaseApp, data);
          });
        }
      );
    }
    data.photoURL = await convertB64ParaUrl(
      firebaseApp,
      data.photoURL,
      user.uid
    );
    const dataModel = new DataModel("category", firebaseApp);
    dataModel.update(
      { category: { ...data, photo: data.photoURL }, uid: user.uid },
      data.id
    );
  }
};

const getStorageImages = async (uid, storage) => {
  const storageRef = ref(storage, `category/${uid}`);
  const result = await listAll(storageRef);

  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));

  return Promise.all(urlPromises);
};

const deleteFile = (firebaseApp, storage, data) => {
  const user = getAuth(firebaseApp).currentUser;
  if (user) {
    const desertRef = ref(
      storage,
      `category/${user.uid}/${data.id}/${data.name}`
    );

    deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {});
  }
};

const convertB64ParaUrl = async (firebaseApp, file, uid) => {
  if (file.indexOf("data:image") > -1) {
    return await saveImageB64(firebaseApp, file, uid);
  } else {
    return file;
  }
};

export {
  verifyLogin,
  login,
  logout,
  register,
  createCategory,
  updateCategory,
  getStorageImages,
  deleteFile,
};
