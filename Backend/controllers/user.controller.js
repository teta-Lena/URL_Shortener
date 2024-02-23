const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/dbconfig");
const { User, validation } = require("../models/users.model");

const userController = {};

userController.signup = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validation(req.body);

  if (error) {
    res.status(404).send({ message: `Error encounted ${error}` });
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User created successfully", json: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validation(req.body);

  if (error) {
    res.status(404).send({ message: `Error encounted ${error}` });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "User with such credentials does not exist" });
    }

    const validpass = await bcrypt.compare(password, user.password);

    if (!validpass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1h",
    });
    res.json({ token, message: "Logged in successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = userController;
