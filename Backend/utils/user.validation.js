const Joi = require("joi");

const validSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().min(6),
});

module.exports = validSchema;
