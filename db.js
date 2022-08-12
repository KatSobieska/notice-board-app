const mongoose = require("mongoose");

const loadTestData = require("./testData");

const connectToDB = () => {
  mongoose.connect("mongodb://localhost:27017/noticeBoardDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
    loadTestData();
  });

  db.on("error", (err) => {
    console.log("Error" + err);
  });
};

module.exports = connectToDB;
