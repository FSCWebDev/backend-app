const Joi = require("joi");

const usersSchema = Joi.object({
  username: Joi.string().invalid(">", "_", "<", ".").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("buyer", "seller", "admin").default("buyer"),
  created: Joi.date().default(Date.now()),
  updated: Joi.date().default(Date.now()),
});

module.exports = usersSchema;
