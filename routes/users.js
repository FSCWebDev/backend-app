const users = require("express").Router();
const userValidator = require("../validation/users");
const Users = require("../models/users");
const {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
  createUserCredentials,
  checkSession,
  isAuthorized,
  hasBeenAuthorized,
} = require("../middleware/general");

users.get("/", async (req, res) => {
  const docs = await Users.find();
  res.send(docs);
});

users.post(
  "/sign-up",
  validateData(userValidator),
  findData(Users, ["email"]),
  createData(Users),
  createUserCredentials,
  checkSession,
  (req, res) => {
    console.log(req.createdDoc);
    res.json(req.body);
  }
);

users.post(
  "/log-in",
  checkSession,
  hasBeenAuthorized,
  validateData(userValidator),
  findData(Users, ["email"]),
  (req, res) => {
    res.json(req.body);
  }
);

users.put(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  updateOrCreateData(Users),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

users.patch(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  updateData(Users),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

users.delete(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  deleteData(),
  (req, res) => {
    res.json(req.deletedDoc);
  }
);

module.exports = users;
