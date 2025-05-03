const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: String,
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

usersSchema.methods.setHash = function () {
  this.hash = bcrypt.hashSync(this.password);
  this.password = "";
};

usersSchema.pre("save", function (next) {
  this.setHash();
  next();
});

usersSchema.set("toJSON", {
  versionKey: false,
  transform: (_, ret) => {
    delete ret.password;
    delete ret.hash;
    return ret;
  },
});

const Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;
