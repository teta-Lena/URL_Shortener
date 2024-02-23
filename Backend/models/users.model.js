const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
};

const User = mongoose.model("User", schema);

const validation = (body) => {
  return Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string(),
    })
    .validate(body);
};
module.exports = { User, validation };
