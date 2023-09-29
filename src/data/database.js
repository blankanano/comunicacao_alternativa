// db.js
import Dexie from "dexie";

export const db = new Dexie("comunicacao-alternativa");

db.version(1).stores({
  user: "++uid, email, emailVerify",
  category: "++id, name, uid, photo",
});
