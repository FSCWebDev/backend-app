const orders = require("express").Router();
const orderValidator = require("../validation/orders");
const Orders = require("../models/orders");
const {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
} = require("../middleware/general");

orders.get("/", async (req, res) => {
  const docs = await Orders.find();
  res.send(docs);
});

orders.post(
  "/",
  validateData(orderValidator),
  findData(Orders, ["user_id"]),
  createData(Orders),
  (req, res) => {
    res.json(req.createdDoc);
  }
);

orders.put(
  "/",
  validateData(orderValidator),
  findData(Orders, ["user_id"]),
  updateOrCreateData(Orders),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

orders.patch(
  "/",
  validateData(orderValidator),
  findData(Orders, ["user_id"]),
  updateData(Orders),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

orders.delete(
  "/",
  validateData(orderValidator),
  findData(Orders, ["user_id"]),
  deleteData(),
  (req, res) => {
    res.json(req.deletedDoc);
  }
);

module.exports = orders;
