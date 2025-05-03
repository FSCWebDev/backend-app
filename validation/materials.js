const Joi = require("joi");

const materialsSchema = Joi.object({
  type: Joi.string().valid("PLA", "PETG", "TPU").required(),
  color: Joi.string().required(),
  weight_remaining: Joi.number()
    .description("Weight remaining in grams")
    .required(),
  spool_size: Joi.number().description("Total spool size in grams").required(),
  status: Joi.string(),
  date_added: Joi.date(),
});

module.exports = materialsSchema;
