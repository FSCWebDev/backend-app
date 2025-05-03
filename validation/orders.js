const Joi = require("joi");

const ordersSchema = Joi.object({
  user_id: Joi.string().required(),
  products: Joi.array(),
  total_price: Joi.number(),
  total_quantity: Joi.number(),
  status: Joi.string().valid("pending", "printing", "shipped", "delivered"),
  created: Joi.date(),
});

module.exports = ordersSchema;
