const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const loadTestData = require("./testData");

const NODE_ENV = process.env.NODE_ENV;
const NBA_USERNAME = process.env.NBA_USERNAME;
const NBA_PASSWORD = process.env.NBA_PASSWORD;

let dbUri = "";

if (NODE_ENV === "production")
  dbUri = `mongodb+srv://${NBA_USERNAME}:${NBA_PASSWORD}@cluster0.ii8kz.mongodb.net/noticeBoardDB`;
else if (NODE_ENV === "test")
  dbUri = "mongodb://localhost:27017/noticeBoardDBtest";
else dbUri = "mongodb://localhost:27017/noticeBoardDB";

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
});

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const store = MongoStore.create({
  mongoUrl: dbUri,
  collection: "sessions",
});

db.once("open", () => {
  console.log("Connected to the database");
  loadTestData();
});
db.on("error", (err) => {
  console.log("Error" + err);
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
    },
  })
);

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/uploads/")));

app.use("/api", require("./routes/ads.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

module.exports = server;
