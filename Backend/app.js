require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const swaggerJSDOC = require("./swagger.json");
const routes = require("./routes/index");

require("./config/dbconfig").connect();

app.use(express.json());
app.use(
  cors({
    origin: ["https://deploy-mern-lwhq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDOC, { explorer: true })
);

app.get("/", (req, res) => {
  res.send("Welcome home");
});

app.use("/", routes);
// app.use("./netlify/functions/api", router);

module.exports = app;
