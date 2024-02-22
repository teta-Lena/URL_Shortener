require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const swaggerJSDOC = require("./swagger.json");
const routes = require("./routes/index");

require("./config/dbconfig").connect();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDOC, { explorer: true })
);

app.get("/welcome", (req, res) => {
  res.send("Welcome home");
});

app.use("/", routes);

module.exports = app;