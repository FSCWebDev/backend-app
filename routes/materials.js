const materials = require("express").Router();
const {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
} = require("../middleware/general");
const materialValidator = require("../validation/materials");
const Material = require("../models/materials");

// TODO: Implement authorization here
materials.get("/", async (_, res) => {
  const materials = await Material.find();
  res.json(materials);
});

// TODO: Implement authorization here
materials.post(
  "/",
  validateData(materialValidator),
  findData(Material, ["color", "type"]),
  createData(Material),
  (req, res) => {
    res.json(req.createdDoc);
  }
);

// TODO: Implement authorization here
materials.put(
  "/",
  validateData(materialValidator),
  findData(Material, ["color", "type"]),
  updateOrCreateData(Material),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

// TODO: Implement authorization here
materials.patch(
  "/",
  validateData(materialValidator),
  findData(Material, ["color", "type"]),
  updateData(),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

materials.delete(
  "/",
  validateData(materialValidator),
  findData(Material, ["color", "type"]),
  deleteData(),
  async (req, res) => {
    res.json(req.deletedDoc);
  }
);

module.exports = materials;
