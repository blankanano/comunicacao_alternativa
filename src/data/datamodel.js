import {
  getDatabase,
  ref,
  set,
  update,
  child,
  onValue,
} from "firebase/database";
import { db } from "./database";

export class DataModel {
  constructor(model, firebaseApp) {
    this.model = model;
    this.db = db;
    this.realtimeDb = getDatabase(firebaseApp);
  }

  async get(id, updates) {
    const db = getDatabase();
    const _ref = ref(db, `${this.model}/` + id);
    onValue(_ref, (snapshot) => {
      console.log(snapshot);
      const data = snapshot.val();
      for (const key of Object.keys(updates)) {
        updates[key](data[key]);
      }
    });
  }

  async list() {
    const dbRef = ref(this.realtimeDb);
    const snapshot = await child(dbRef, `${this.model}`);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  async create(data, saveLocal = false) {
    set(ref(this.realtimeDb, `${this.model}/` + data.uid), data);

    if (saveLocal) {
      await this.createLocal(data);
    }
  }

  async update(data, id) {
    const dbRef = ref(this.realtimeDb);

    const updates = {};

    for (let key of Object.keys(data)) {
      updates[`${this.model}/${id}/${key}`] = data[key];
    }

    update(dbRef, updates);
  }

  async delete(id) {
    ref(this.realtimeDb, `${this.model}/` + id).remove();
  }

  async getLocalUser() {
    return await this.getDbTable(this.model).toArray();
  }

  async getLocalData(uid) {
    const data = await this.getDbTable(this.model).toArray();
    return data.filter((x) => x.uid === uid)[0];
  }

  async deleteLocal(condition) {
    return await this.getDbTable(this.model).where(condition).delete();
  }

  async clearDatabase(list = null) {
    if (list) {
      for (let l of list) {
        this.getDbTable(l).clear();
      }
    } else {
      this.getDbTable(this.model).clear();
    }
  }

  async createLocal(data, id = null) {
    if (id) {
      await this.getDbTable(this.model).put({
        id: id,
        ...data,
      });
    } else {
      await this.getDbTable(this.model).put(data);
    }
  }

  getDbTable(model) {
    switch (model) {
      case "user":
        return this.db.user;

      case "category":
        return this.db.category;

      default:
        return this.db.user;
    }
  }
}
