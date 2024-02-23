const express = require("express");
const router = express.Router();

const urlController = require("../controllers/url.controller"); // Correct import

const authMiddleware = require("../middleware/auth");

router.post(
  "/generateurl",
  //   authMiddleware.authenticate,
  urlController.generateNewShortURL
);

module.exports = router;
