const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const urlRoutes = require("./url.routes");
router.use("/users", userRoutes);
router.use("/u", urlRoutes);
module.exports = router;
