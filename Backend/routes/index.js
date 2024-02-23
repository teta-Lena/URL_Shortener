const express = require("express");
const router = express.Router();
const cors = require("cors");

const userRoutes = require("./user.routes");
const urlRoutes = require("./url.routes");
router.use("/users", userRoutes);
router.use(cors());
router.use("/u", urlRoutes);
module.exports = router;
