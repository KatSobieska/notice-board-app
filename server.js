const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const app = express();

connectToDB();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port: 8000");
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
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    mongoUrl: process.env.DB_URL,
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build"));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found..." });
});

module.exports = server;
