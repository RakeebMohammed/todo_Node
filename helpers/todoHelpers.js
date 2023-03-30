let db = require("../config/connection");
let objectid = require("objectid");
module.exports = {
  getTasks: () => {
    return new Promise(async (resolve, reject) => {
      let result = await db
        .get()
        .collection("tasks")
        .find({ deleted: false })
        .sort({ priority: 1 })
        .toArray();
      console.log(result);
      if (result.length!=0) resolve(result);
      else reject();
    });
  },
  insertTask: (task) => {
    return new Promise((resolve, reject) => {
      task.priority = parseInt(task.priority);
      task.pending = true;
      task.deleted = false;
      db.get()
        .collection("tasks")
        .insertOne(task)
        .then(() => {
          resolve();
        });
    });
  },
  getAllactions: () => {
    return new Promise(async (resolve, reject) => {
      let pendings = await db
        .get()
        .collection("tasks")
        .countDocuments({ pending: true });

      let pending = await db
        .get()
        .collection("tasks")
        .countDocuments({ pending: true });
      let cancelled = await db
        .get()
        .collection("tasks")
        .countDocuments({ cancelled: true });
      let completed = await db
        .get()
        .collection("tasks")
        .countDocuments({ complete: true });
      let deleted = await db
        .get()
        .collection("tasks")
        .countDocuments({ deleted: true });
      console.log(completed);
      let result = {
        pending,
        cancelled,
        deleted,
        completed,
      };
      resolve(result);
    });
  },
  completeTask: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("tasks")
        .updateOne(
          { _id: objectid(id) },
          { $set: { complete: true }, $unset: { pending: "", cancelled: "" } }
        )
        .then(() => {
          resolve();
        });
    });
  },
  cancelTask: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("tasks")
        .updateOne(
          { _id: objectid(id) },
          { $set: { cancelled: true }, $unset: { pending: "", complete: "" } }
        )
        .then(() => {
          resolve();
        });
    });
  },
  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection("tasks")
        .updateOne(
          { _id: objectid(id) },
          {
            $set: { deleted: true },
            $unset: { pending: "", cancelled: "", complete: "" },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },
  sortedReport: () => {
    return new Promise(async (resolve, reject) => {
      let report = await db
        .get()
        .collection("tasks")
        .find({ deleted: false })
        .sort({ pending: -1, complete: 1 })
        .toArray();
      if (report.length!=0) resolve(report);
      else reject();
    });
  },
};
