const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const serverless = require("serverless-http");
const router = require("./routes");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// module.exports.handler = serverless(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
