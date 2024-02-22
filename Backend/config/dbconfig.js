const mongoose = require("mongoose");

const { MONGO_URI } = process.env;
exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB connected successfully.....");
    })
    .catch((e) => {
      console.log("DB connection failed " + e);
    });
};
