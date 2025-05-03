const mongoose = require("mongoose");

const materialsSchema = new mongoose.Schema({
  type: {
    type: "String",
    enum: ["PLA", "PETG", "TPU"],
  },
  color: String,
  weight_remaining: Number,
  spool_size: { type: Number, default: 1000 },
  status: {
    type: String,
    enum: ["Available", "Low", "Out of Stock"],
  },
  date_added: {
    type: Date,
    default: Date.now(),
  },
});

materialsSchema.methods.setStatus = function () {
  const weight = this.weight_remaining;
  if (weight <= 0) this.status = "Out of Stock";
  else if (weight < 500) this.status = "Low";
  else this.status = "Available";
};

materialsSchema.pre("save", function (next) {
  this.setStatus();
  next();
});

materialsSchema.set("toJSON", {
  versionKey: false,
});

const Material = mongoose.model("Material", materialsSchema, "materials");

module.exports = Material;
