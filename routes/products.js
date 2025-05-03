const products = require("express").Router();
const productValidator = require("../validation/products");
const Products = require("../models/products");
const {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
} = require("../middleware/general");

products.get("/", async (req, res) => {
  const docs = await Products.find();
  res.send(docs);
});

products.post(
  "/",
  validateData(productValidator),
  findData(Products, ["title"]),
  createData(Products),
  (req, res) => {
    res.json(req.createdDoc);
  }
);

products.put(
  "/",
  validateData(productValidator),
  findData(Products, ["user_id"]),
  updateOrCreateData(Products),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

products.patch(
  "/",
  validateData(productValidator),
  findData(Products, ["user_id"]),
  updateData(Products),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

products.delete(
  "/",
  validateData(productValidator),
  findData(Products, ["user_id"]),
  deleteData(),
  (req, res) => {
    res.json(req.deletedDoc);
  }
);

module.exports = products;
