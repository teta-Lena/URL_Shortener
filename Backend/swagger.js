const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
const doc = {
  info: {
    version: "1.0.0",
    title: "MIS",
    description: "MIS made by Ishimwe Teta Lena",
    contact: {
      name: " Tlxna Ishimwe",
      email: "tetalenaa@gmail.com",
    },
  },
  host: "localhost:4000",
  schemes: ["http", "https"],
  produces: ["application/json"],
  tags: [
    {
      name: "CRUD",
      description: "User CRUD",
    },
  ],
  definitions: {
    User: {
      fname: "Teta",
      lname: "Lena",
      email: "tetalenaa@gmail.com",
      password: "t<>?2005",
      userrole: "user",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
