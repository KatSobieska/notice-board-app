const mongoose = require("mongoose");

const loadTestData = require("./testData");

const connectToDB = () => {
  const NODE_ENV = process.env.NODE_ENV;
  let dbUri = "";

  if (NODE_ENV === "production")
    dbUri = `mongodb://localhost:27017/noticeBoardDB`;
  else if (NODE_ENV === "test")
    dbUri = "mongodb://localhost:27017/noticeBoardDBtest";
  else dbUri = "mongodb://localhost:27017/noticeBoardDB";

  mongoose.connect(dbUri, {
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
