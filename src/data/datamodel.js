import { getDatabase, ref, set, update, child } from "firebase/database";
import { db } from "./database";

export class DataModel {
  constructor(model, firebaseApp) {
    this.model = model;
    this.db = db;
    this.realtimeDb = getDatabase(firebaseApp);
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
    if (window.navigator.onLine) {
      set(ref(this.realtimeDb, `${this.model}/` + data.uid), data);
    }

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

  async delete(id, deleteLocal = false) {
    ref(this.realtimeDb, `${this.model}/` + id).remove();
  }

  async getLocalUser() {
    return await this.getDbTable(this.model).toArray();
  }

  async getLocalData(uid) {
    let data = await this.getDbTable(this.model).toArray();
    return data
      .filter((x) => x.uid === uid)
      .map((x) => {
        return { ...x.category, id: x.id };
      });
  }

  async deleteLocal(id) {
    return await this.getDbTable(this.model).where("id").equals(id).delete();
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
